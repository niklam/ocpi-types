import { IsUrl, IsOptional, IsInt, Max, Min } from 'class-validator';
import { IsOcpiCiString } from '../../../decorators/is-ocpi-ci-string.decorator';

// Enum imports
import { ImageCategory } from '../enums/image-category.enum';

/**
 * This class references an image related to an EVSE in terms of a file name or url.
 * According to the roaming connection between one EVSE Operator and one or more Navigation Service Providers,
 * the hosting or file exchange of image payload data has to be defined. The exchange of this content data is out of scope of OCPI.
 * However, the recommended setup is a public available web server hosted and updated by the EVSE Operator.
 * Per charge point an unlimited number of images of each type is allowed.
 *
 * Recommended are at least two images where one is a network or provider logo and the second is a station photo.
 * If two images of the same type are defined, not only one should be selected but both should be displayed together.
 *
 * Photo Dimensions: The recommended dimensions for all photos is a minimum width of 800 pixels and a minimum height of 600 pixels.
 * Thumbnail should always have the same orientation as the original photo with a size of 200 by 200 pixels.
 *
 * Logo Dimensions: The recommended dimensions for logos are exactly 512 pixels in width height.
 * Thumbnail representations of logos should be exactly 128 pixels in width and height.
 * If not squared, thumbnails should have the same orientation as the original.
 */
export class ImageDto {
  /**
   * URL from where the image data can be fetched through a web browser.
   */
  @IsUrl({}, {
    message: 'url must be a valid URL'
  })
  url: string;

  /**
   * URL from where a thumbnail of the image can be fetched through a webbrowser.
   */
  @IsOptional()
  @IsUrl({}, {
    message: 'thumbnail must be a valid URL'
  })
  thumbnail?: string;

  /**
   * Describes what the image is used for.
   */
  category: ImageCategory;

  /**
   * Image type like: gif, jpeg, png, svg.
   */
  @IsOcpiCiString()
  type: string;

  /**
   * Width of the full scale image.
   */
  @IsOptional()
  @IsInt({
    message: 'width must be an integer'
  })
  @Min(1, {
    message: 'width must be at least 1 pixel'
  })
  @Max(99999, {
    message: 'width must be at most 99999 pixels'
  })
  width?: number;

  /**
   * Height of the full-scale image.
   */
  @IsOptional()
  @IsInt({
    message: 'height must be an integer'
  })
  @Min(1, {
    message: 'height must be at least 1 pixel'
  })
  @Max(99999, {
    message: 'height must be at most 99999 pixels'
  })
  height?: number;
}