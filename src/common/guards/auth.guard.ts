import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest()
        const apiKey = request.headers['x-api-key']

        if(apiKey === 'route-optimizer-key' ) {
            return true
        }

        throw new UnauthorizedException('API Key inválida ou não fornecida')
    }
}