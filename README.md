# NAS Danışmanlık

Bu proje, **NAS Danışmanlık** firması için geliştirilmiş modern, dinamik ve responsive bir kurumsal web uygulamasıdır. Proje [Angular CLI](https://github.com/angular/angular-cli) versiyon 17.3.7 kullanılarak oluşturulmuştur ve arama motoru optimizasyonu (SEO) ile hızlı sayfa yüklemeleri sağlamak amacıyla **Server-Side Rendering (SSR)** desteklemektedir.

## Özellikler ve Sayfalar

Uygulama temel olarak aşağıdaki bölümlerden oluşmaktadır:

- **Ana Sayfa:** Firmanın vizyonunu ve öne çıkan hizmetlerini yansıtan karşılama sayfası.
- **Kurumsal:** Hakkımızda, Sıkça Sorulan Sorular (SSS) ve Referanslar sayfaları.
- **Hizmetler:**
  - AVM Kiralama
  - Marka & Yatırım Danışmanlığı
  - Bayi & Franchise Yönetimi
  - Toptan Satış
  - Koleksiyon & Tasarım
  - Proje Çizimi
  - Görsel Danışmanlık
  - İnsan Kaynakları
  - IT Altyapı
- **Galeri:** Firma içi veya projelere ait görsellerin sergilendiği alan.
- **İletişim:** İletişim bilgileri ve iletişim formu.

## Kullanılan Teknolojiler

- **Framework:** Angular 17
- **Stil Yönetimi:** SCSS (Sass)
- **SSR (Server-Side Rendering):** `@angular/ssr` ve Express.js ile entegre.
- **Diğer Kütüphaneler:** RxJS, SweetAlert2 (Kullanıcı bildirimleri için).

## Geliştirme Sunucusu (Development Server)

Geliştirme aşamasında projeyi yerel ortamda çalıştırmak için:

```bash
ng serve
```
Uygulama `http://localhost:4200/` adresinde çalışacaktır. Kaynak dosyalarda yaptığınız değişiklikler otomatik olarak tarayıcıda yenilenecektir.

## Derleme (Build) ve Prodüksiyon

Projeyi prodüksiyon ortamı için derlemek adına aşağıdaki komutu kullanabilirsiniz:

```bash
npm run build:prod
```

Derlenmiş dosyalar `dist/` klasörü içerisinde oluşturulacaktır. Uygulamayı SSR modunda sunucu üzerinden çalıştırmak için:

```bash
npm run serve:ssr:nas-danismanlik
```
veya
```bash
npm run deploy:prod
```

## Kod İskelesi (Code Scaffolding)

Yeni bir bileşen (component) oluşturmak için:
```bash
ng generate component component-name
```
Ayrıca `directive`, `pipe`, `service`, `class`, `guard`, `interface`, `enum`, `module` gibi yapıları da aynı yöntemle üretebilirsiniz.

## Testler

- **Birim (Unit) Testleri:** `ng test` komutuyla Karma üzerinden birim testlerini çalıştırabilirsiniz.

## Daha Fazla Bilgi

Angular CLI hakkında daha fazla bilgi ve komut referansları için [Angular CLI Overview and Command Reference](https://angular.io/cli) sayfasını ziyaret edebilirsiniz.
