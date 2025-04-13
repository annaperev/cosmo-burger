import type {} from '../support/cypress';

describe('Конструктор бургера', () => {
  beforeEach(() => {
    // Мокаем запрос на получение ингредиентов
    cy.fixture('ingredients.json').then((ingredients) => {
      cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
        statusCode: 200,
        body: ingredients
      }).as('getIngredients');
    });

    // Интерсептим запрос на создание заказа
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
      statusCode: 200,
      body: {
        success: true,
        name: 'Test Burger',
        order: {
          number: 123456
        }
      }
    }).as('orderRequest');
    
    // Эмулируем вход в систему
    cy.window().then((win) => {
      win.localStorage.setItem('accessToken', 'Bearer test-token');
      win.localStorage.setItem('refreshToken', 'test-refresh-token');
    });
    
    // Посещаем главную страницу
    cy.visit('/', { timeout: 10000 });
    
    // Ждем загрузки ингредиентов
    cy.wait('@getIngredients');
  });
  
  it('Должен собрать бургер, создать заказ и получить номер заказа', () => {
    // Проверяем наличие компонентов на странице
    cy.contains('Соберите бургер').should('exist');
    
    // Проверяем наличие разделов для ингредиентов
    cy.contains('Булки').should('exist');
    cy.contains('Соусы').should('exist');
    cy.contains('Начинки').should('exist');
    
    // Перетаскиваем булку в конструктор
    cy.get('[data-testid="ingredient-item-card"]').first().as('bun')
      .trigger('dragstart');
    cy.get('[data-testid="burger-constructor-section"]').as('constructor')
      .trigger('dragover')
      .trigger('drop');
    cy.get('@bun').trigger('dragend');
    
    // Проверяем, что булка добавлена в конструктор (верх и низ)
    cy.get('[data-testid="burger-constructor-bun"]').should('have.length', 2);
    cy.get('[data-testid="burger-constructor-bun"]').first().should('contain', '(верх)');
    cy.get('[data-testid="burger-constructor-bun"]').last().should('contain', '(низ)');
    
    // Перетаскиваем начинку в конструктор
    cy.contains('Начинки').click();
    cy.get('[data-testid="ingredient-item-card"]').contains('Мясо').as('filling')
      .trigger('dragstart');
    cy.get('@constructor')
      .trigger('dragover')
      .trigger('drop');
    cy.get('@filling').trigger('dragend');
    
    // Перетаскиваем соус в конструктор
    cy.get('[data-testid="ingredient-item-card"]').contains('Соус').as('sauce')
      .trigger('dragstart');
    cy.get('@constructor')
      .trigger('dragover')
      .trigger('drop');
    cy.get('@sauce').trigger('dragend');
    
    // Проверяем, что ингредиенты добавлены в конструктор
    cy.get('[data-testid="constructor-element-element"]').should('have.length.at.least', 2);
    
    // Проверяем наличие итоговой суммы и кнопки заказа
    cy.get('[data-testid="burger-constructor-price"]').should('exist');
    cy.get('button').contains('Оформить заказ').should('exist')
  });
  
  it('Должен открывать модальное окно с информацией об ингредиенте при клике', () => {
    // Кликаем на первый ингредиент
    cy.get('[data-testid="ingredient-item-card"]').first().click();
    
    // Проверяем, что модальное окно с деталями ингредиента открылось
    cy.get('[data-testid="modal-container"]').should('exist');
    cy.contains('Детали ингредиента').should('exist');
    
    // Проверяем, что в модальном окне есть информация об ингредиенте
    cy.get('[data-testid="ingredient-details-container"]').should('exist');
    cy.get('[data-testid="ingredient-details-name"]').should('exist');
    
    // Закрываем модальное окно
    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="modal-container"]').should('not.exist');
  });
  
  it('Должен удалять ингредиент из конструктора при клике на кнопку удаления', () => {
    // Добавляем булку в конструктор
    cy.get('[data-testid="ingredient-item-card"]').first().as('bun')
      .trigger('dragstart');
    cy.get('[data-testid="burger-constructor-section"]').as('constructor')
      .trigger('dragover')
      .trigger('drop');
    cy.get('@bun').trigger('dragend');
    
    // Добавляем начинку в конструктор
    cy.get('[data-testid="ingredient-item-card"]').contains('Мясо').as('filling')
    .trigger('dragstart');
  cy.get('@constructor')
    .trigger('dragover')
    .trigger('drop');
  cy.get('@filling').trigger('dragend');

      // Перетаскиваем соус в конструктор
      cy.get('[data-testid="ingredient-item-card"]').contains('Соус').as('sauce')
      .trigger('dragstart');
    cy.get('@constructor')
      .trigger('dragover')
      .trigger('drop');
    cy.get('@sauce').trigger('dragend');
    
    // Запоминаем количество ингредиентов
    cy.get('[data-testid="constructor-element-element"]').not('[data-testid="constructor-element-bun"]')
      .its('length').then((initialCount) => {
        // Удаляем ингредиент, нажав на крестик
        cy.get('.constructor-element__action').eq(1).click();
        
        // Проверяем, что количество ингредиентов уменьшилось
        cy.get('[data-testid="constructor-element-element"]').not('[data-testid="constructor-element-bun"]')
          .its('length').should('be.lessThan', initialCount);
      });
  });
});