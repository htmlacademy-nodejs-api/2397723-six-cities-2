import {Command} from './command.interface.js';
import {DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD} from './command.constant.js';
import {TSVFileReader} from '../../shared/libs/file-reader/tsv-file-reader.js';
import {createOffer, getErrorMessage, getMongoURI} from '../../shared/helpers/index.js';
import {AutoGenerateOffer} from '../../shared/types/index.js';
import {DatabaseClient, MongoDatabaseClient} from '../../shared/libs/database-client/index.js';
import {DefaultUserService, UserModel, UserService} from '../../shared/modules/user/index.js';
import {OfferModel, OfferService} from '../../shared/modules/offer/index.js';
import {ConsoleLogger} from '../../shared/libs/logger/console.logger.js';
import {Logger} from '../../shared/libs/logger/index.js';

export class ImportCommand implements Command {
  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new OfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: AutoGenerateOffer) {
    const user = await this.userService.findOrCreate({
      ...offer.host,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({
      title: offer.title,
      type: offer.type,
      price: offer.price,
      city: offer.city,
      location: offer.location,
      isFavorite: offer.isFavorite,
      isPremium: offer.isPremium,
      rating: offer.rating,
      description: offer.description,
      images: offer.images,
      previewImage: offer.previewImage,
      goods: offer.goods,
      hostId: user.id,
      bedrooms: offer.bedrooms,
      maxAdults: offer.maxAdults,
      commentsCount: 0
    });

  }

  public getName(): string {
    return '--import';
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(`Details: ${getErrorMessage(error)}`);
    }
  }
}
