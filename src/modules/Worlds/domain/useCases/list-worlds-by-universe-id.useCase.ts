import {WorldGateway} from '@modules/Worlds/infrastructure/gateways/world.gateway.ts';

export class ListWorldsByUniverseIdUseCase
{
    static async handler(universeId: string)
    {
        return await WorldGateway.list(universeId);
    }
}