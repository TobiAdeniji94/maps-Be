import { User } from "../../user/entities/user.entity";

export interface ActionsInterface {
    id: string;
    action: string;
    actor: User;
    entityType: string;
    entityId: string;
}