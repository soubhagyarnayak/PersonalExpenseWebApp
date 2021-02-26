export class ExpenseItem {
    category: string
    recipient: string
    description: string
    amount: number
    createtime: Date
    tags: string
    constructor(
        category:string, recipient:string,
        description:string, amount:number,
        createtime:Date, tags:string){
            this.category = category
            this.recipient = recipient
            this.description = description
            this.amount = amount
            this.createtime = createtime
            this.tags = tags
    }
}