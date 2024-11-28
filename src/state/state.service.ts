import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { Repository } from 'typeorm';
import { State } from './entities/state.entity';
import { ResponseMessage, responseMessage } from '../utils/response-message';
import * as fs from 'fs';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
  ) {}
  async createState(createStateDto: CreateStateDto) {
    const exsitingState = await this.stateRepository.findOne({where: {name: createStateDto.name}});

    if (exsitingState) {
      return responseMessage(false, 'State already exists');
    }

    const state = await this.stateRepository.create(createStateDto);
    return await this.stateRepository.save(state);
  }

  async updateState(id: string, updateStateDto: UpdateStateDto) {
    const state = await this.stateRepository.findOne({where: {id}});
    if (!state) {
      return responseMessage(false, 'State not found');
    }
    
    this.stateRepository.merge(state, updateStateDto);

    return await this.stateRepository.save(state);
  }

  async getStates() {
    return await this.stateRepository.find();
  }

  async getStateById(id: string) {
    return await this.stateRepository.findOne({where: {id}});
  }

  async getStateByName(name: string) {
    return await this.stateRepository.findOne({where: {name}});
  }

  async deleteState(id: string) {
    return await this.stateRepository.delete({id});
  }

  // async nigeriaStates( filePath: string): Promise<any> {
  //   try {
  //     const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  //     return jsonData;
  //   } catch (error) {
  //     return responseMessage(false, 'Error getting states');
  //   }
    
  // }
}
