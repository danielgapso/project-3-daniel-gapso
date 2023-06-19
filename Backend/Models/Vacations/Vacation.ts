class Vacation {
  public VacationCode: number;
  public Destination: string;
  public Description: string;
  public StartDate: Date;
  public EndDate: Date;
  public Price: number;
  public Img: string;
  public likes: number;
  
  constructor(
    VacationCode: number, Destination: string, Description: string,
    StartDate: Date, EndDate: Date, Price: number, Img: string , likes: number) {

    this.SetVacationCode(VacationCode);
    this.SetDestination(Destination);
    this.SetDescription(Description);
    this.SetStartDate(StartDate);
    this.SetEndDate(EndDate);
    this.SetPrice(Price);
    this.SetImg(Img);
    this.likes = likes;
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
  public SetVacationCode(VacationCode: number) {
    this.VacationCode = VacationCode;
  }
  public SetDestination(Destination: string) {
    this.Destination = Destination;
  }
  public SetDescription(Description: string) {
    this.Description = Description;
  }
  public SetStartDate(StartDate: Date) {
    this.StartDate = StartDate;
  }
  public SetEndDate(EndDate: Date) {
    this.EndDate = EndDate;
  }
  public SetPrice(Price: number) {
    this.Price = Price;
  }
  public SetImg(Img: string) {
    this.Img = Img;
  }
}

export default Vacation