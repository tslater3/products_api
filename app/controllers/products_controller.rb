class ProductsController < ApplicationController
  def index
  end

  def show
  end

  def product_card
    product = params[:product]
    render partial: 'product_card', locals: { product: {id: product[:id], name: product[:name], base_price: product[:base_price], quantity_on_hand: product[:quanity_on_hand], color: product[:color], weight: product[:weight], other_attributes: product[:other_attributes] }}
  end

end
