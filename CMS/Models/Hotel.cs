//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CMS.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Hotel
    {
        public int idHotel { get; set; }
        public string hoTen { get; set; }
        public string diaChi { get; set; }
        public string SDT { get; set; }
        public string email { get; set; }
        public string hotel1 { get; set; }
        public Nullable<System.DateTime> timeStart { get; set; }
        public Nullable<System.DateTime> timeEnd { get; set; }
        public Nullable<int> guestNumber { get; set; }
        public Nullable<int> @checked { get; set; }
    }
}