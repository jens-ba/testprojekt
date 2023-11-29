export type Profiles = {
    profiles: Profile[];
  };
  
  export type Profile = {
    id: number;
    isVisible: boolean | null;
    profileName: string;
    email: string | null;
    givenName: string | null;
    dateOfBirth: string | null;
    surname: string | null;
    driverLicenseType: string | null;
    presentation: string | null;
    presentationEnglish: string | null;
    employeeTags: EmployeeTags[] | null;
  };
  
  export type EmployeeTags = {
    tagId: number;
    tag: Tag;
    tagScore: number;
  };
  
  export type Tag = {
    name: string;
    id: number;
    tagType: TagType;
  };
  
  export type TagType = {
    id: number;
    displayAsCompetence: boolean;
    name: string;
    userReadableName: string;
    bilingual: boolean;
  };
  