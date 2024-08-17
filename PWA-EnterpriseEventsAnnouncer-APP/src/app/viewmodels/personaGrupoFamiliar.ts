
export class PersonaGrupoFamiliar  {
    public GrupoFamiliarId: string;
    public DNI: number;
    public Name: string;
    public LastName: string;
    public Age: number;
    public IsAffiliate: boolean;
    public IsBeneficiaryOfMedical: boolean;


    constructor() {
        this.GrupoFamiliarId = '';
        this.DNI = 0;
        this.Name = '';
        this.LastName = '';
        this.Age = 0;
        this.IsAffiliate = false;
        this.IsBeneficiaryOfMedical = false;
    }
}
