export interface IRate {
  code: string
  country: string
  currency: string
  amount: number
  rate: number
  forDate: Date
  fetchDatetime: Date
}

export interface ICNBParsed {
    forDate: 
    rates: IRate,

}
