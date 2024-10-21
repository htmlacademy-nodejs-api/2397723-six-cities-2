import { Request } from 'express';
import { RequestBody, RequestParams } from '../../libs/rest/index.js';
import {ChangeFavoriteStatusDto} from './dto/change-favorite-status.dto.js';

export type ChangeFavoriteStatusRequest = Request<RequestParams, RequestBody, ChangeFavoriteStatusDto>;
