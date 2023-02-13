import winston, {format, transports} from "winston";

export const logger = winston.createLogger({
        level: 'http',
        format: winston.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
            new winston.transports.File({ filename: 'error.log', level: 'error' }),
            new winston.transports.Console({
                format: format.combine(
                    format.timestamp(),
                    format.colorize(),
                    format.simple()
                )
            }),
            new winston.transports.Http({ host: 'localhost', port:8000 }),
        ],
        exceptionHandlers: [
            new winston.transports.File({ filename: 'exceptions.log' })
        ]
    }
)
logger.rejections.handle(
    new transports.File({ filename: 'rejections.log' })
);