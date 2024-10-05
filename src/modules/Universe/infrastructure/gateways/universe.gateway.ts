import {IUniverse} from '@modules/Universe/infrastructure/interfaces';
import {APIBasePath} from '@common/utils';

export class UniverseGateway
{
    private static routes = {
        list:
            {
                url: '/universes',
                method: "GET"
            }
    }
    static async list(): Promise<IUniverse[]>
    {
        const url = `${APIBasePath}${this.routes.list.url}`;
        return fetch(url, {
            method: this.routes.list.method
        })
            .then(response => response.json())
            .then(data => { return data })
            .catch(error => { throw error });
    }
}