import winston, {format, transports} from "winston";

export const logger = winston.createLogger({
        format: format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
            new transports.File({ filename: './src/module4/logs/error.log', level: 'error' }),
            new transports.Console({
                format: format.combine(
                    format.timestamp(),
                    format.colorize(),
                    format.simple()
                ),
                level: "info"
            }),
        ],
        exceptionHandlers: [
            new transports.File({
                filename: './src/module4/logs/exceptions.log',
                level: "error",
                handleExceptions: true
            })
        ],
        rejectionHandlers: [
            new transports.File({
                filename: './src/module4/logs/rejections.log',
                level: "error",
                handleRejections: true
            })
        ]
    }
)