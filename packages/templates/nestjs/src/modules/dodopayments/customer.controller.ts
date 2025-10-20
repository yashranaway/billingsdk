import { Controller, Get, Post, Put, Query, Body, HttpException, HttpStatus } from '@nestjs/common';
import { getDodoPaymentsClient } from '../../lib/dodopayments';
import { z } from 'zod';

const customerCreateSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().min(1, "Name is required"),
  phone_number: z.string().optional().nullable(),
});

const customerUpdateSchema = z.object({
  email: z.string().email("Invalid email format").optional(),
  name: z.string().min(1, "Name is required").optional(),
  phone_number: z.string().optional().nullable(),
});

@Controller('dodopayments/customer')
export class CustomerController {
  @Get()
  async getCustomer(@Query('customer_id') customer_id?: string) {
    try {
      if (!customer_id) {
        throw new HttpException('customer_id is required', HttpStatus.BAD_REQUEST);
      }

      const customer = await getDodoPaymentsClient().customers.retrieve(customer_id);
      return customer;
    } catch (error) {
      console.error('Error fetching customer:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createCustomer(@Body() body: any) {
    try {
      const validationResult = customerCreateSchema.safeParse(body);
      if (!validationResult.success) {
        throw new HttpException(
          {
            error: "Validation failed",
            details: validationResult.error.issues.map(issue => ({
              field: issue.path.join('.'),
              message: issue.message
            }))
          },
          HttpStatus.BAD_REQUEST
        );
      }

      const customer = await getDodoPaymentsClient().customers.create(validationResult.data as any);
      return customer;
    } catch (error) {
      console.error('Error creating customer:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put()
  async updateCustomer(@Query('customer_id') customer_id: string, @Body() body: any) {
    try {
      if (!customer_id) {
        throw new HttpException('customer_id is required', HttpStatus.BAD_REQUEST);
      }

      const validationResult = customerUpdateSchema.safeParse(body);
      if (!validationResult.success) {
        throw new HttpException(
          {
            error: "Validation failed",
            details: validationResult.error.issues.map(issue => ({
              field: issue.path.join('.'),
              message: issue.message
            }))
          },
          HttpStatus.BAD_REQUEST
        );
      }

      const customer = await getDodoPaymentsClient().customers.update(customer_id, validationResult.data as any);
      return customer;
    } catch (error) {
      console.error('Error updating customer:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('subscriptions')
  async getCustomerSubscriptions(@Query('customer_id') customer_id?: string) {
    try {
      if (!customer_id) {
        throw new HttpException('customer_id is required', HttpStatus.BAD_REQUEST);
      }

      const subscriptions = await getDodoPaymentsClient().subscriptions.list({
        customer_id: customer_id
      });
      return subscriptions;
    } catch (error) {
      console.error('Error fetching customer subscriptions:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('payments')
  async getCustomerPayments(@Query('customer_id') customer_id?: string) {
    try {
      if (!customer_id) {
        throw new HttpException('customer_id is required', HttpStatus.BAD_REQUEST);
      }

      const payments = await getDodoPaymentsClient().payments.list({
        customer_id: customer_id
      });
      return payments;
    } catch (error) {
      console.error('Error fetching customer payments:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
