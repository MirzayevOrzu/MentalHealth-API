export interface DatabaseConfigI {
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
}

export enum NodeEnv {
    PROD = 'production',
    TEST = 'test',
    DEV = 'development',
}

export interface ConfigI {
    env: NodeEnv;
    port: number;
    database: DatabaseConfigI;
    jwt: JwtI;
}

export interface JwtI {
    secret: string;
}

export default (): ConfigI => ({
    env: process.env.NODE_ENV as NodeEnv,
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
});
