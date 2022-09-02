import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { SupabaseAuthStrategy, SupabaseAuthUser } from 'nestjs-supabase-auth';
import { Request } from "express";

@Injectable()
export class SupabaseStrategy extends PassportStrategy(SupabaseAuthStrategy, 'supabase') {
    public constructor() {
        super({
            supabaseUrl: process.env.SUPABASE_URL,
            supabaseKey: process.env.SUPABASE_KEY,
            supabaseOptions: {},
            supabaseJwtSecret: process.env.SUPABASE_JWT_SECRET,
            extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    public async validate(payload: SupabaseAuthUser): Promise<SupabaseAuthUser> {
        super.validate(payload);
    }

    public authenticate(req: Request): void {
        super.authenticate(req);
    }
}