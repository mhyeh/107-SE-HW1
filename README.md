# Software Engineering HW1

四資工三  
B10515020  
葉敏宣

## Environment

```
node v9.7.1
npm  v6.4.1

MariaDB Server 10.3
```

## Database setting

```
MariaDB connection 的設定檔在 phonebook_back-end/config/mysql.connect.json
可依照資料庫自行設定

資料庫中新增一個 phonebook 的 table
其中 id 的 type 是 int, 須設定成 auto increment 、primary key
name 的 type 是 text
phone 的 type 是 text
```

## Build

### Front-end

```
cd phonebook_front-end
npm install
npm run serve
```

Web will run at http://localhost:8080/

### Back-end

```
cd phonebook_back-end
npm install
npm run build
npm run serve
```

Server will run at http://localhost:3000/