### `Pizza Delivery App`

Uma aplicação para encomenda de pizza e entrega ao domicilio, feita com a STACK MERN.
Que pode ser utilizada para qualquer loja que faz encomenda de qualquer producto,a app no minimo precisará de pequenas alterações.


### `Pizza Delivery SERVIDOR`

Está é servidor feito em Nodejs e Express.
O lado que recebe as requisições e conecta a aplicação a base de dados MongoDB.


### `Pizza Delivery Cliente`

Está é a app que o cliente utiliza para fazer  os pedidos.

Para fazer a encomenda o cliente cria uma conta na aplicação.

IMG

Depois adiciona os produtos no carrinho a quantidade que ele deseja.

IMG

Quando terminar de adicionar os productos ele deve fechar e esperar a confirmação da loja.
O cliente só pode começar a fazer outra encomenda depois do carro estar confirmado e à caminho.

IMG



### `Pizza Delivery Admin`

Está é a app feita com Reactjs, e Redux que o administrador controla as encomendas.

IMG

O Admin confirma as encomendas, poem elas à caminho, marca como entregada e faz os controles das vendas como também controla os utilizadores e adiciona as pizzas

O Admin pode abrir uma encomenda para o cliente adicionar novos productos

# Painel do Administrador

IMG


# Encomendas

IMG

# Historico das vendas

IMG



### `Tempo de Desenvolvimento`

Para Eu construir esta aplicação levou-me aprozimandamente 4 Semanas.


# Primeira Semana 

Comecei fazendo a API e estruturação da base de dados, construção dos models e routes, codificação de cada rota da API.

# Segunda Semana 

Comecei com o desenho na parte do Admin.
Fiz primeiro o Painel
Adicionei a funcionalidade de Add Food, de primeira cadastrava todos os tipos de comidas, visto que poderia levar muito tempo, decidi focar-me apenas
em Pizzas.
Fiz o menu de encomendas, que tbm pode ser chamada de notificação, lá o Admin confirma, abre e cancela a encomenda.

# Terceira Semana

Comecei com a parte do cliente, desenhei primeiro e depois adicionei as funcionalidades comoÇ
Login, Cadastro
Adionar producto ao carrinho
Pesquisar Pizza
E os dias restantes foram para Fazer o Layout resposnivo e Fluido

# Quarta Semana

Estava dificil trabalhar apenas com estado os estados locais da App e então decide adicionar o React para Globalizar os estados e assim
conseguir fazer algumas melhorias e partilha de informação de um componente para o outro a partir de clicks.
Adicionei a consistencia de dados, armazendo o estado do Utilizador no LocalStore(Sei que não é uma boa ideia), visto que o utilizador logava, quando actualizava o Brwoser ele perdia o estado ou seja tinha que logar novamente.
Adicionei outros: menus como Historico, Clientes, pois eu via que o Painel estava muito simples e com pouca informação.




by Batista Tomé Oliveira

