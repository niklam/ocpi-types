import { IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';
import { Expose } from 'class-transformer';
import { IsOcpiDateTime } from '../../../decorators/is-ocpi-datetime.decorator';

// Enum imports
import { ProfileType } from '../enums/profile-type.enum';

/**
 * Contains the charging preferences of an EV driver.
 */
export class ChargingPreferencesDto {
  /**
   * Type of Smart Charging Profile selected by the driver. The ProfileType has to be supported at the Connector and for every supported ProfileType, a Tariff MUST be provided.
   * This gives the EV driver the option between different pricing options.
   */
  @Expose({ name: 'profile_type' })
  profileType: ProfileType;

  /**
   * Expected departure. The driver has given this Date/Time as expected departure moment.
   * It is only an estimation and not necessarily the Date/Time of the actual departure.
   */
  @IsOptional()
  @IsOcpiDateTime()
  @Expose({ name: 'departure_time' })
  departureTime?: string;

  /**
   * Requested amount of energy in kWh. The EV driver wants to have this amount of energy charged.
   */
  @IsOptional()
  @IsNumber(
    {},
    {
      message: 'energyNeed must be a number',
    },
  )
  @Min(0, {
    message: 'energyNeed must be at least 0',
  })
  @Expose({ name: 'energy_need' })
  energyNeed?: number;

  /**
   * The driver allows their EV to be discharged when needed, as long as the other preferences are met:
   * EV is charged with the preferred energy (energy_need) until the preferred departure moment (departure_time).
   * Default if omitted: false
   */
  @IsOptional()
  @IsBoolean()
  @Expose({ name: 'discharge_allowed' })
  dischargeAllowed?: boolean;
}
