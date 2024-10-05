import {UniverseGateway} from '@modules/Universe/infrastructure/gateways/universe.gateway.ts';

export class ListUniversesUseCase
{
    static async handler()
    {
        return await UniverseGateway.list();
    }
}