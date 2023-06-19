class Vacation {
    public Destination: string;
    public Description: string;
    public StartDate: string;
    public EndDate: string;
    public Price: number;
    public Img: string;
    public likes: number;
    public VacationCode?: string;
    

    constructor(
       Destination: string, Description: string,
        StartDate: string, EndDate: string, Price: number, Img: string ,likes: number,VacationCode?: string ) {
      
            this.VacationCode=VacationCode;
            this.Destination=Destination;
            this.Description=Description;
            this.StartDate=StartDate;
            this.EndDate=EndDate;
            this.Price=Price;
            this.Img=Img;
            this.likes = likes;
        }
    }

    export default Vacation