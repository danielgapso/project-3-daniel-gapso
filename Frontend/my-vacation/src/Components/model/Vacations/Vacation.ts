class Vacation {
    private VacationCode: string;
    private Destination: string;
    private Description: string;
    private StartDate: string;
    private EndDate: string;
    private Price: number;
    private Img: string;

    constructor(
        VacationCode: string, Destination: string, Description: string,
        StartDate: string, EndDate: string, Price: number, Img: string) {
      
            this.VacationCode=VacationCode;
            this.Destination=Destination;
            this.Description=Description;
            this.StartDate=StartDate;
            this.EndDate=EndDate;
            this.Price=Price;
            this.Img=Img;
        }
        public GetVacationCode() {
            return this.VacationCode;
          }
          public GetDestination() {
            return this.Destination;
          }
          public GetDescription() {
            return this.Description;
          }
          public GetStartDate() {
            return this.StartDate;
          }
          public GetEndDate() {
            return this.EndDate;
          }
          public GetPrice() {
            return this.Price;
          }
          public GetImg() {
            return this.Img;
          }  
    }

    export default Vacation