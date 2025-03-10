// Initialized the Appwrite client
// imported all the necessary database elements for the application
import { Avatars, Client, Account, Databases, ID, Storage } from "appwrite";

const appwriteClient = new Client();

appwriteClient
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67b399f1002aff80a5b9');

const account = new Account(appwriteClient);
const databases = new Databases(appwriteClient); 
const storage = new Storage(appwriteClient);
const avatars = new Avatars(appwriteClient);


export { avatars , storage, appwriteClient, account, ID , databases};
