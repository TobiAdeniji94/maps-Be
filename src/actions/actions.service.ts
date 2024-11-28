import { Injectable } from '@nestjs/common';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actions } from './entities/actions.entity';
import { ActionsInterface } from './dto/actions.interface';
import { ResponseMessage, responseMessage } from '../utils/response-message';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ActionsService {
  constructor(
    @InjectRepository(Actions)
    private readonly actionsRepository: Repository<Actions>,
  ) {}

  async createAction(action: string, firstName: string, lastName: string, entityType: string, entityId: string): Promise<Actions | ResponseMessage> {
    try {
      // const newAction = this.actionsRepository.create({
      //   action,
      //   actor: actor.id,
      //   entityType,
      //   entityId,
      // });
      // await this.actionsRepository.save(newAction);

      const newAction = new Actions();
      newAction.action = action;
      newAction.actor = firstName + ' ' + lastName;
      newAction.entityType = entityType;
      newAction.entityId = entityId;

      // console.log('create action actor', actor);
      
      
      await this.actionsRepository.save(newAction);

      return newAction;
    } catch (error) {
      return responseMessage(false, 'Error occured while creating action', [error.message]);
    }
  }

  // async approveAction(actor: string, entityType: string, entityId: string ): Promise<Actions | ResponseMessage> {
  //   return this.createAction('approve', actor, entityType, entityId);
  // }

  // async declineAction(actor: string, entityType: string, entityId: string ): Promise<Actions | ResponseMessage> {
  //   return this.createAction('decline', actor, entityType, entityId);
  // }

  // async deleteAction(actor: string, entityType: string, entityId: string ): Promise<Actions | ResponseMessage> {
  //   return this.createAction('delete', actor, entityType, entityId);
  // }

  // async updateAction(actor: string, entityType: string, entityId: string ): Promise<Actions | ResponseMessage> {
  //   return this.createAction('update', actor, entityType, entityId);
  // }

  // async viewAction(actor: string, entityType: string, entityId: string ): Promise<Actions | ResponseMessage> {
  //   return this.createAction('view', actor, entityType, entityId);
  // }

  // async publishAction(actor: string, entityType: string, entityId: string ): Promise<Actions | ResponseMessage> {
  //   return this.createAction('publish', actor, entityType, entityId);
  // }

  findAll() {
    return `This action returns all actions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} action`;
  }

  update(id: number, updateActionDto: UpdateActionDto) {
    return `This action updates a #${id} action`;
  }

  remove(id: number) {
    return `This action removes a #${id} action`;
  }
}
