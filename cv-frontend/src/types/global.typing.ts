export interface ICompany {
    id: string;
    name: string;
    size: string;
    createdAt: string;
}

export interface ICreateCompanyDTO {
    name: string;
    size: string;
}

export interface IJob{
    id: string;
    title: string;
    level: string;
    companyId: string;
    companyName: string;
    createdAt: string;
}

export interface ICreateJobDTO {
    title: string;
    level: string;
    companyId: string;
}

export interface ICandidate{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    coverLetter: string;
    resumeURL: string;
    jobId: string;
    jobTitle: string;
    createdAt: string;
}

export interface ICreateCandidateDTO {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    coverLetter: string;
    jobId: string;
}