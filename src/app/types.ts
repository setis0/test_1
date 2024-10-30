export interface ValuteXml{
    ValCurs:{
        Valute:ValuteChunk[]
    }
}
export interface ValuteChunk {
    NumCode: number
    CharCode: string
    Nominal: number
    Name: string
    Value: string
    VunitRate: string
}
export interface ValuteData extends Omit<ValuteChunk,"Value"|"VunitRate">{
    Value: number
    VunitRate: number
}