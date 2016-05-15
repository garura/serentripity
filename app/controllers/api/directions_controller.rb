require 'yelp'

class Api::DirectionsController < ApplicationController

  def show
    client = Yelp::Client.new({ consumer_key: "_5rj6bpyBVeglFf-o0evsg",
                            consumer_secret: "pOCDNW2T880D_JM0HnS-awWVL9s",
                            token: "6Vme_xFE1W1QRTY_9uM26WyP_1IY6vWJ",
                            token_secret: "Os_a-s_pkTYRO4_6LnR8yVFRWr0"
                          })
    search_params = { sort: 2, limit: 10, radius_filter: 20000}
    origin = params[:result]
    results = client.search(origin, search_params)
    # farthest = results.businesses.max_by {|place| place.distance }
    farthest = results.businesses.sample
    farthest = farthest.location.display_address.join(" ")

    render json: [origin, farthest]
  end

end
