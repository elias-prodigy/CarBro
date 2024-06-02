import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private authService: AuthService) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromRequest(request);
        if (this.authService.isTokenBlacklisted(token)) {
            return false;
        }
        return super.canActivate(context);
    }

    private extractTokenFromRequest(request: any): string | null {
        const authHeader = request.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            return authHeader.split(' ')[1];
        }
        return null;
    }
}