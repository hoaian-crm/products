import { Injectable } from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { FindStatisticDto } from './dto/find.dto';

@Injectable()
export class StatisticService {
  constructor(private readonly productService: ProductService) {}

  async find(query: FindStatisticDto) {
    return await this.productService.findAndCount(query);
  }

  async topProducts() {
    const arr = await this.productService.sortTotalSold();
    const sum = arr.reduce((total, item) => {
      return total + item.total_sold * (item.price - item.discount);
    }, 0);

    return arr.map((item) => ({
      name: item.name,
      alias: item.alias,
      price: item.price,
      discout: item.discount,
      total_sold: item.total_sold,
      total_profit: item.total_sold * (item.price - item.discount),
      percent_profit:
        ((item.total_sold * (item.price - item.discount)) / sum) * 100,
    }));
  }
}
