import {Observable} from "rxjs";

export const CryptoServiceToken = Symbol('CryptoServiceToken')

export class CryptoService extends Observable<any> {

  constructor() {
    super(subscriber => {
      this._get()
        .then(resp => resp.json())
        .then(resp => subscriber.next(resp))
        .catch(err => subscriber.error(err))
        .finally(() => subscriber.complete())
    })
  }

  private _get(): Promise<Response> {
    const API_KEY = 'abbb5e5711ccba9c1a6a54f80ac2e427436ae7ba6e1929c1b5cde656f379fc2d'
    return fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,DASH&tsyms=BTC,USD,EUR&api_key=${API_KEY}`)
  }

}
