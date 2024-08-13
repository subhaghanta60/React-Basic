import conf from "../config/config";
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client  = new Client();
    account;

    constructor(){
        this.client
                    .setEndpoint(conf.appwriteUrl)
                    .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){

        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                return this.login({email,password})

            }else {
                return userAccount;
            }
            
        } catch (error) {
            console.log(error)
            throw error;
            
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
            
        } catch (error) {
            console.error(error);
            throw error
            
        }
    }
    async getCurrentUSer() {
        try {
                return await this.account.get();
            
        } catch (error) {
            console.log("Appright : Current USer Error",error);
           
            
        }
        return null;
    }
    async logout() {
        try {
            
        } catch (error) {
            console.log("Appright Servicxe:: L:ogout :: Error",error)
            
        }
    }
}

const authService = new AuthService();
export default authService;

