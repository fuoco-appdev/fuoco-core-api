import { Module } from '@nestjs/common';
import { SupabaseStrategy } from '../strategies/supabase.strategy';
import { GqlAuthGuard } from '../guards/auth.guard';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  controllers: [],
  providers: [
    SupabaseStrategy,
  ],
  exports: [GqlAuthGuard, SupabaseStrategy],
})
export class AuthModule {}
