import { UserDocument } from "../../models/User.model";  // adjust path

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}

export {};
