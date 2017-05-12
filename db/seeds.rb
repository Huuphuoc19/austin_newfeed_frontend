User.create({
    first_name: 'Austin',
    last_name: 'Phan',
    email: 'phanphuocdt@gmail.com',
    password: '12345678'
  })


100.times do |n|
  date = 100.days.ago + (n + 1).days
  Post.create({
    content: Faker::Lorem.paragraphs,
    user_id: User.find_by_email('phanphuocdt@gmail.com').id,
    created_at: date
  })
end
