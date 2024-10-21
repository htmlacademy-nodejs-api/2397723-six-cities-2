import { Request } from 'express';
import { RequestBody, RequestParams } from '../../libs/rest/index.js';
import {PremiumOffersDto} from './dto/premium-offers.dto.js';

export type PremiumOffersRequest = Request<RequestParams, RequestBody, PremiumOffersDto>;
