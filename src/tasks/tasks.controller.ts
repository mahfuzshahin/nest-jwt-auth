import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
  HttpCode,
  HttpStatus, UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: 'Get the All Task' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Successfully retrieved user profile.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing token.' })
  async findAll(): Promise<{ data: Task[] }> {
    const tasks = await this.tasksService.findAll();
    return { data: tasks };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get One Task' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Successfully retrieved Task.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing token.' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ data: Task }> {
    const task = await this.tasksService.findOne(id);
    return { data: task };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Create Task' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing token.' })
  async create(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<{ data: Task }> {
    const newTask = await this.tasksService.create(createTaskDto);
    return { data: newTask };
  }

  // ✅ ADD THE UPDATE ENDPOINT
  @Patch(':id')
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'The task has been successfully Update.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing token.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<{ data: Task }> {
    const updatedTask = await this.tasksService.update(id, updateTaskDto);
    return { data: updatedTask };
  }

  // ✅ ADD THE DELETE ENDPOINT
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'The task has been successfully deleted.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing token.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.remove(id);
  }
}