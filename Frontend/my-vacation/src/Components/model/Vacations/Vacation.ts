class Vacation {
    public Destination: string;
    public Description: string;
    public StartDate: string;
    public EndDate: string;
    public Price: number;
    public Img: string;
    public VacationCode?: string;

    constructor(
       Destination: string, Description: string,
        StartDate: string, EndDate: string, Price: number, Img: string ,VacationCode?: string) {
      
            this.VacationCode=VacationCode;
            this.Destination=Destination;
            this.Description=Description;
            this.StartDate=StartDate;
            this.EndDate=EndDate;
            this.Price=Price;
            this.Img=Img;
        }
    }

    export default Vacation