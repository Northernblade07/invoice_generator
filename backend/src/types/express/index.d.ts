import { UserDocument } from "../../models/User.model";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}
