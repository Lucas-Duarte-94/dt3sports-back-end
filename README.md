# dt3sports-back-end

Para utilizar o back-end para testar o recebimento de dados pelo front-end basta utilizar o codigo comentado na rota /images que é utilizada pelo metodo GET.

Com o código atual o back-end faz a consulta ao banco de dados MySQL utilizando o ORM Sequelize.

Para enviar ao front-end as imagens só foi necessário criar uma tabela:

Product 
chair_name varchar(100) 
color_name varchar(100)  
url varchar(255)


imagem
