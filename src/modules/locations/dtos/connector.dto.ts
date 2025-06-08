import { IsArray, IsInt, IsOptional, IsUrl, Max, Min } from 'class-validator';
import { Expose } from 'class-transformer';
import { IsOcpiCiString } from '../../../decorators/is-ocpi-ci-string.decorator';
import { IsOcpiDateTime } from '../../../decorators/is-ocpi-datetime.decorator';

// Enum imports
import { ConnectorType } from '../enums/connector-type.enum';
import { ConnectorFormat } from '../enums/connector-format.enum';
import { PowerType } from '../enums/power-type.enum';

/**
 * A Connector is the socket or cable and plug available for the EV to use.
 * A single EVSE may provide multiple Connectors but only one of them can be in use at the same time.
 * A Connector always belongs to an EVSE object.
 */
export class ConnectorDto {
  /**
   * Identifier of the Connector within the EVSE.
   * Two Connectors may have the same id as long as they do not belong to the same EVSE object.
   */
  @IsOcpiCiString()
  id: string;

  /**
   * The standard of the installed connector.
   */
  standard: ConnectorType;

  /**
   * The format (socket/cable) of the installed connector.
   */
  format: ConnectorFormat;

  /**
   * The power type of the connector.
   */
  @Expose({ name: 'power_type' })
  powerType: PowerType;

  /**
   * Maximum voltage of the connector (line to neutral for AC_3_PHASE), in volt [V].
   * For example: DC Chargers might vary the voltage during charging when battery almost full.
   */
  @IsInt({
    message: 'maxVoltage must be an integer',
  })
  @Min(1, {
    message: 'maxVoltage must be at least 1 volt',
  })
  @Max(2000000, {
    message: 'maxVoltage must be at most 2,000,000 volts',
  })
  @Expose({ name: 'max_voltage' })
  maxVoltage: number;

  /**
   * Maximum amperage of the connector, in ampere [A].
   */
  @IsInt({
    message: 'maxAmperage must be an integer',
  })
  @Min(1, {
    message: 'maxAmperage must be at least 1 ampere',
  })
  @Max(1000000, {
    message: 'maxAmperage must be at most 1,000,000 amperes',
  })
  @Expose({ name: 'max_amperage' })
  maxAmperage: number;

  /**
   * Maximum electric power that can be delivered by this connector, in Watts (W).
   * When the maximum electric power is lower than the calculated value from voltage and amperage, this value should be set.
   * For example: A DC Charge Point which can delivers up to 920V and up to 400A can be limited to a maximum of 150kW (max_electric_power = 150000).
   * Depending on the car, it may supply max voltage or current, but not both at the same time.
   * For AC Charge Points, the amount of phases used can also have influence on the maximum power.
   */
  @IsOptional()
  @IsInt({
    message: 'maxElectricPower must be an integer',
  })
  @Min(1, {
    message: 'maxElectricPower must be at least 1 watt',
  })
  @Max(10000000, {
    message: 'maxElectricPower must be at most 10,000,000 watts (10MW)',
  })
  @Expose({ name: 'max_electric_power' })
  maxElectricPower?: number;

  /**
   * Identifiers of the currently valid charging tariffs.
   * Multiple tariffs are possible, but only one of each Tariff.type can be active at the same time.
   * Tariffs with the same type are only allowed if they are not active at the same time: start_date_time and end_date_time period not overlapping.
   * When preference-based smart charging is supported, one tariff for every possible ProfileType should be provided.
   * These tell the user about the options they have at this Connector, and what the tariff is for every option.
   * For a "free of charge" tariff, this field should be set and point to a defined "free of charge" tariff.
   */
  @IsOptional()
  @IsArray()
  @IsOcpiCiString({ each: true })
  @Expose({ name: 'tariff_ids' })
  tariffIds?: string[];

  /**
   * URL to the operator's terms and conditions.
   */
  @IsOptional()
  @IsUrl({}, {
    message: 'termsAndConditions must be a valid URL',
  })
  @Expose({ name: 'terms_and_conditions' })
  termsAndConditions?: string;

  /**
   * Timestamp when this Connector was last updated (or created).
   */
  @IsOcpiDateTime()
  @Expose({ name: 'last_updated' })
  lastUpdated: string;
}