# dt3sports-back-end

Para utilizar o back-end para testar o recebimento de dados pelo front-end basta utilizar o codigo comentado na rota /images que é utilizada pelo metodo GET.

Com o código atual o back-end faz a consulta ao banco de dados MySQL utilizando o ORM Sequelize.

Para enviar ao front-end as imagens só foi necessário criar uma tabela:

tabela: Product  
chair_name varchar(100)  
color_name varchar(100)  
url varchar(255)


![Captura de tela 2022-01-09 022132](https://user-images.githubusercontent.com/57713413/148670490-43321a38-925b-4eac-8637-ce175d3b9cee.png)

