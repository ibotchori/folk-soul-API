import { Options, diskStorage } from 'multer'
import { resolve } from 'path'
import { randomBytes } from 'crypto'

export const multerConfig = {
  // dest: resolve(__dirname, '..', '..', 'images'),
  storage: diskStorage({
    destination: (request, file, callback) => {
      // callback(null, resolve(__dirname, '..', '..', 'images'))
      callback(null, './uploads/images')
    },
    filename: (request, file, callback) => {
      randomBytes(16, (error, hash: any) => {
        if (error) {
          callback(error, file.filename)
        }
        const filename = `${hash.toString('HEX')}_${file.originalname}`
        callback(null, filename)
      })
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (request, file, callback) => {
    const formats = ['image/jpeg', 'image/jpg', 'image/png']

    if (formats.includes(file.mimetype)) {
      callback(null, true)
    } else {
      callback(new Error('Format not accepted'))
    }
  },
} as Options
