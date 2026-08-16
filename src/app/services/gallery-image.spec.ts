import { TestBed } from '@angular/core/testing';

import { GalleryImage } from './gallery-image';

describe('GalleryImage', () => {
  let service: GalleryImage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalleryImage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
