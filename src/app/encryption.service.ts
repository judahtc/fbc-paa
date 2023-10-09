import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  constructor() {}

  private readonly SECRET_KEY_E = '7F3B9A6C6ECA5D0E89B8F1E74D59764A';
  private readonly SECRET_KEY_D = 'D2E8F0B4A9C36F7E5D0A8C9B2E8F1D76';

  encrypt(data: string): string {
    const encrypted = CryptoJS.AES.encrypt(data, this.SECRET_KEY_E).toString();
    return encrypted;
  }

  decrypt(encryptedData: string): string {
    const decrypted = CryptoJS.AES.decrypt(
      encryptedData,
      this.SECRET_KEY_E
    ).toString(CryptoJS.enc.Utf8);

    return decrypted;
  }
}
