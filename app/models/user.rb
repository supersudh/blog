class User < ActiveRecord::Base
	has_many :posts
	has_many :comments, through: :posts
  attr_accessor :password
  validates_presence_of :email, :nickname, :password
  before_save :create_encrypted_password
	def self.authenticate(email="", password="")
    user = User.find_by_email(email)
    if user && user.password_match?(password)
      return user
    else
      return false
    end
  end

  def password_match?(password="")
    encrypted_password == User.hash_with_salt(password, salt)
  end
  
  def self.make_salt(email="")
    Digest::SHA1.hexdigest("Use #{email} with #{Time.now} to make salt")
  end
  
  def self.hash_with_salt(password="", salt="")
    Digest::SHA1.hexdigest("Put #{salt} on the #{password}")
  end
  
  private
  
  def create_encrypted_password
    unless password.blank?
      self.salt = User.make_salt(email) if salt.blank?
      self.encrypted_password = User.hash_with_salt(password, salt)
    end
  end

  def clear_password
    self.password = nil
  end	
end
