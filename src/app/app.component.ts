import { PetraAssetResponse } from './core/models/petra-asset-response.interface';
import { Component, OnInit } from '@angular/core';
import { FinanceService } from './core/services/finance.service';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { finalize } from 'rxjs';
import { EFinanceFilterOptions } from './core/models/finance-filter-options.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public barChartOptions: ChartOptions<'line'> = {
    plugins: {
        tooltip: {
          callbacks: {
            title: (text) => {
              const currentDate = new Date(this.petraAssetResponse.timestamp[text[0].dataIndex] * 1000);
              return currentDate.toLocaleDateString();
            }
          }
        }
    }
  }

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
      }
    ]
  }

  private petraAssetResponse!: PetraAssetResponse['chart']['result'][0];

  public chartFilterOptions = [
    { label: "1D", value: EFinanceFilterOptions.ONE_DAY },
    { label: "5D", value: EFinanceFilterOptions.FIVE_DAYS },
    { label: "1M", value: EFinanceFilterOptions.ONE_MONTH },
    { label: "3M", value: EFinanceFilterOptions.THREE_MONTHS },
    { label: "6M", value: EFinanceFilterOptions.SIX_MONTHS },
    { label: "1Y", value: EFinanceFilterOptions.ONE_YEAR },
    { label: "3Y", value: EFinanceFilterOptions.THREE_YEARS },
  ];

  public chartIntervalOptions = [
    { label: "1 min", value: "1m", disabled: false },
    { label: "2 min", value: "2m", disabled: false },
    { label: "5 min", value: "5m", disabled: false },
    { label: "30 min", value: "30m", disabled: false },
    { label: "1 hour", value: "1h", disabled: false },
    { label: "1 day", value: "1d", disabled: false },
    { label: "1 week", value: "1w", disabled: false },
  ];

  public selectedIntervalOption: string = "1d";

  public selectedChartFilter: EFinanceFilterOptions = EFinanceFilterOptions.ONE_MONTH;

  public loading: boolean = false;

  constructor(
    private financeService: FinanceService,
  ) { }

  ngOnInit(): void {
    this.fetchFinanceData();
  }

  public fetchFinanceData(teste?: any): void {
    this.loading = true;
    console.log(teste);
    console.log(this.selectedChartFilter)
    if (this.selectedChartFilter === EFinanceFilterOptions.ONE_DAY) {
      this.selectedIntervalOption = '1m';
    }

    switch (this.selectedChartFilter) {
      case EFinanceFilterOptions.ONE_DAY:
        this.chartIntervalOptions[this.chartIntervalOptions.length - 1].disabled = true;
        this.chartIntervalOptions[this.chartIntervalOptions.length - 2].disabled = true;

        this.chartIntervalOptions[0].disabled = false;
        this.chartIntervalOptions[1].disabled = false;
        this.chartIntervalOptions[2].disabled = false;
        this.chartIntervalOptions[3].disabled = false;
        this.chartIntervalOptions[4].disabled = false;
        break;
      default:
        this.chartIntervalOptions[0].disabled = true;
        this.chartIntervalOptions[1].disabled = true;
        this.chartIntervalOptions[2].disabled = true;
        this.chartIntervalOptions[3].disabled = true;
        this.chartIntervalOptions[4].disabled = true;
        
        this.chartIntervalOptions[this.chartIntervalOptions.length - 1].disabled = false;
        this.chartIntervalOptions[this.chartIntervalOptions.length - 2].disabled = false;
        break;
    }

    this.financeService.fetchAssetsPrices(
        this.selectedIntervalOption,
        this.selectedChartFilter,
      )
      .pipe(finalize(() => this.loading = false))
      .subscribe(({ chart: { result: [result] } }) => {
        this.petraAssetResponse = { ...result };

        this.lineChartData = {
          labels: result.timestamp.map((time) => {
            const date = new Date(time * 1000);
            if (this.selectedChartFilter === EFinanceFilterOptions.ONE_DAY) {
              return `${date.getHours()}:${date.getMinutes()}`
            }
            return date.getDate()
          }),
          datasets: [
            {
              data: result.indicators.quote[0].open,
              label: 'Teste'
            }
          ]
        }
      });
  }
}
