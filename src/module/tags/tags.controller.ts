import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { FindTagsDto } from './dto/find-tags.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { Response } from 'crm-prototypes';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  async getAllTag(@Query() query: FindTagsDto) {
    const [result, count] = await this.tagsService.getAllTags(query);
    return Response.findSuccess([result, count]);
  }

  @Post()
  async createTags(@Body() body: CreateTagDto) {
    try {
      const data = await this.tagsService.createTag(body);
      return Response.createSuccess(data);
    } catch (error) {
      throw new BadRequestException(error.detail);
    }
  }
}
