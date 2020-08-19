import expressLoader from './express';
import Logger from './logger';

export default async (expressApp) => {

    expressLoader(expressApp);
    Logger.info('✌️ Express loaded');
};
