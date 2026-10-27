/**
 * ============================================================================
 * DOCUMENT TEMPLATES ENGINE
 * Master Data Structure & HTML Templates for Official Manual Documents
 * ============================================================================
 */

(function (window) {
  'use strict';

  const DOCUMENT_TEMPLATES = [
    // =========================================================================
    // 1. সাহায্যের জন্য প্রত্যয়ন পত্র (Certificate for Financial Aid / Help)
    // =========================================================================
    {
      id: 'doc_protyoyon_help',
      title: 'সাহায্যের জন্য প্রত্যয়ন পত্র',
      category: 'প্রত্যয়ন পত্র',
      language: 'বাংলা',
      description: 'দরিদ্র ও মেধাবী শিক্ষার্থীদের আর্থিক সাহায্য, উপবৃত্তি ও অনুদান প্রাপ্তির জন্য স্থানীয় জনপ্রতিনিধি কর্তৃক প্রত্যয়ন পত্র।',
      form_fields: [
        { id: 'applicant_name', label: 'আবেদনকারীর নাম', type: 'text', placeholder: 'উদা: মোহাম্মদ হাসান', default_value: 'মোহাম্মদ হাসান' },
        { id: 'father_name', label: 'পিতার নাম', type: 'text', placeholder: 'উদা: মোহাম্মদ আলী', default_value: 'মোহাম্মদ আলী' },
        { id: 'mother_name', label: 'মাতার নাম', type: 'text', placeholder: 'উদা: ফাতেমা বেগম', default_value: 'ফাতেমা বেগম' },
        { id: 'village', label: 'গ্রাম', type: 'text', placeholder: 'উদা: শাহপুর', default_value: 'শাহপুর' },
        { id: 'post_office', label: 'ডাকঘর', type: 'text', placeholder: 'উদা: শাহপুর ডাকঘর', default_value: 'শাহপুর ডাকঘর' },
        { id: 'thana', label: 'থানা', type: 'text', placeholder: 'উদা: বঙ্গবন্ধু থানার', default_value: 'বঙ্গবন্ধু থানার' },
        { id: 'district', label: 'জেলা', type: 'text', placeholder: 'উদা: ময়মনসিংহ', default_value: 'ময়মনসিংহ' },
        { id: 'ward_no', label: 'ওয়ার্ড নং', type: 'text', placeholder: 'উদা: ওয়ার্ড নং ৫', default_value: 'ওয়ার্ড নং ৫' },
        { id: 'child_name', label: 'পুত্র/কন্যার নাম', type: 'text', placeholder: 'উদা: মোহাম্মদ হাসান', default_value: 'মোহাম্মদ হাসান' },
        { id: 'school_name', label: 'বিদ্যালয়/প্রতিষ্ঠানের নাম', type: 'text', placeholder: 'উদা: শাহপুর উচ্চ বিদ্যালয়', default_value: 'শাহপুর উচ্চ বিদ্যালয়' },
        { id: 'class_name', label: 'শ্রেণী', type: 'text', placeholder: 'উদা: ১০ম শ্রেণী', default_value: '১০ম শ্রেণী' },
        { id: 'section', label: 'শাখা', type: 'text', placeholder: 'উদা: বিজ্ঞান শাখা', default_value: 'বিজ্ঞান শাখা' },
        { id: 'roll_no', label: 'ক্রমিক/রোল নং', type: 'text', placeholder: 'উদা: ১৫', default_value: '১৫' },
        { id: 'total_members', label: 'সংসারের মোট সদস্য সংখ্যা', type: 'text', placeholder: 'উদা: ৫', default_value: '৫' },
        { id: 'student_count', label: 'অধ্যয়নরত সন্তানের সংখ্যা', type: 'text', placeholder: 'উদা: ৩', default_value: '৩' },
        { id: 'reason', label: 'আর্থিক সংকটের কারণ', type: 'text', placeholder: 'উদা: বন্যা ও ফসলের ক্ষতি', default_value: 'বন্যা ও ফসলের ক্ষতি' }
      ],
      template_html: `
        <div style="border: 2px solid #0f766e; padding: 5px; border-radius: 4px; min-height: 250mm; box-sizing: border-box;">
          <div style="border: 1px solid #14b8a6; padding: 25mm 20mm; border-radius: 3px; min-height: calc(250mm - 14px); box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <h2 style="text-align: center; font-weight: bold; margin-bottom: 30px; font-size: 26px; color: #0f172a;">প্রত্যয়ন পত্র</h2>

              <p style="line-height: 2.2; text-align: justify; font-size: 16px; color: #1e293b;">
                এই মর্মে প্রত্যয়ন করা যাইতেছে যে, - {{applicant_name}}, 
                পিতাঃ {{father_name}}, 
                মাতাঃ {{mother_name}}, 
                বর্তমান ঠিকানাঃ গ্রামঃ {{village}}, 
                পোঃ {{post_office}}, 
                থানাঃ {{thana}}, 
                জেলাঃ {{district}}, 
                আমার নিকট পরিচিত। তিনি অত্র {{ward_no}} -এর একজন স্থায়ী বাসিন্দা। 
                তাহার পুত্র/কন্যা {{child_name}}, 
                {{school_name}} - এর 
                {{class_name}} শ্রেণীর একজন নিয়মিত ছাত্র/ছাত্রী। 
                শাখা- {{section}}, 
                ক্রমিক নং {{roll_no}}। 
                আমার জানামতে তাহার সংসারের সদস্য সংখ্যা {{total_members}} জন। 
                মোট {{student_count}} জন সন্তান বিদ্যালয়ে লেখাপড়া করে। 
                তিনি পরিবারে একমাত্র উপার্জনকারী ব্যক্তি। {{reason}} 
                এর কারণে বর্তমানে তিনি সন্তানদের লেখাপড়ার খরচ এবং সংসারের ব্যয় নির্বাহ করিতে অত্যন্ত কষ্টসাধ্য অবস্থার মধ্যে আছেন। 
                তাহার সন্তানদের লেখাপড়ার বিষয়ে যেকোন প্রকার সহযোগিতা প্রদানের জন্য আমি জোর সুপারিশ করিতেছি।
              </p>

              <br>
              <p style="font-size: 16px; color: #1e293b;">আমি তাহার সর্বাঙ্গীন মঙ্গল কামনা করি।</p>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 50px; padding-top: 15px;">
              <div style="text-align: center; min-width: 160px;">
                <div style="color: #94a3b8; margin-bottom: 4px; font-size: 12px; letter-spacing: 2px;">...................................</div>
                <span style="font-size: 14px; font-weight: 700; color: #0f172a; display: block;">প্রার্থীর স্বাক্ষর</span>
              </div>

              <div style="text-align: center; min-width: 170px;">
                <div style="color: #94a3b8; margin-bottom: 4px; font-size: 12px; letter-spacing: 2px;">...................................</div>
                <span style="font-size: 14px; font-weight: 700; color: #0f172a; display: block;">চেয়ারম্যান / কাউন্সিলর</span>
                <span style="font-size: 12px; color: #64748b;">স্বাক্ষর ও অফিশিয়াল সিলমোহর</span>
              </div>
            </div>
          </div>
        </div>
      `
    },

    // =========================================================================
    // 2. সাফ-কবলা বা বিক্রয় দলিল (Standard Absolute Land Sale Deed)
    // =========================================================================
    {
      id: 'doc_2',
      title: 'সাফ-কবলা বা বিক্রয় দলিল',
      category: 'দলিল',
      language: 'বাংলা',
      description: 'স্থাবর সম্পত্তি বা জমি স্থায়ীভাবে হস্তান্তরের জন্য প্রমিত সাব-রেজিস্ট্রি ফরম্যাট, চৌহদ্দি ও তফসিল বিবরণী সম্বলিত সাফ-কবলা দলিল।',
      form_fields: [
        { id: 'sub_registry_office', label: 'সাব-রেজিস্ট্রি অফিস', type: 'text', placeholder: 'উদা: সদর সাব-রেজিস্ট্রি অফিস, ঢাকা' },
        { id: 'deed_date', label: 'দলিল সম্পাদনের তারিখ', type: 'text', placeholder: 'উদা: ২৩/০৯/২০২৬', default_value: '২৩/০৯/২০২৬' },
        { id: 'seller_name', label: 'বিক্রেতা/দাতার নাম', type: 'text', placeholder: 'উদা: আলহাজ্ব মো: আব্দুল করিম' },
        { id: 'seller_father', label: 'বিক্রেতার পিতার নাম', type: 'text', placeholder: 'উদা: মৃত হাজী কাসেম আলী' },
        { id: 'seller_address', label: 'বিক্রেতার ঠিকানা', type: 'text', placeholder: 'উদা: গ্রাম: ভাটারা, ডাকঘর: ভাটারা, থানা: গুলশান, জেলা: ঢাকা' },
        { id: 'seller_nid', label: 'বিক্রেতার জাতীয় পরিচয়পত্র নং', type: 'text', placeholder: 'উদা: ২৬৯২৫৬৭৮৯০১২৩' },
        { id: 'buyer_name', label: 'ক্রেতা/গ্রহীতার নাম', type: 'text', placeholder: 'উদা: প্রকৌশলী মো: সাজ্জাদ হোসেন' },
        { id: 'buyer_father', label: 'ক্রেতার পিতার নাম', type: 'text', placeholder: 'উদা: মো: জহিরুল ইসলাম' },
        { id: 'buyer_address', label: 'ক্রেতার ঠিকানা', type: 'text', placeholder: 'উদা: ফ্ল্যাট-৪বি, ধানমন্ডি আ/এ, ঢাকা' },
        { id: 'buyer_nid', label: 'ক্রেতার জাতীয় পরিচয়পত্র নং', type: 'text', placeholder: 'উদা: ৫৫০১২৩৪৫৬৭৮৯০' },
        { id: 'mouza_jl', label: 'মৌজা ও জে.এল নং', type: 'text', placeholder: 'উদা: মৌজা: ভাটারা, জে.এল নং: ২১' },
        { id: 'khatian_info', label: 'খতিয়ান নং (CS / SA / RS)', type: 'text', placeholder: 'উদা: সি.এস-১২, এস.এ-৪৫, আর.এস-৭৮' },
        { id: 'dag_no', label: 'দাগ নং', type: 'text', placeholder: 'উদা: সাবেক দাগ-৩২০, হাল দাগ-৫৪০' },
        { id: 'land_amount', label: 'জমির পরিমাণ ও শ্রেণি', type: 'text', placeholder: 'উদা: ৫ (পাঁচ) শতাংশ নাল জমি' },
        { id: 'total_price', label: 'মোট বিক্রয় মূল্য (অঙ্কে ও কথায়)', type: 'text', placeholder: 'উদা: ২৫,০০,০০০/- (পঁচিশ লক্ষ টাকা)' },
        { id: 'boundaries', label: 'চৌহদ্দি (উত্তরে/দক্ষিণে/পূর্বে/পশ্চিমে)', type: 'text', placeholder: 'উদা: উত্তরে-রাস্তা, দক্ষিণে-রহিম, পূর্বে-নদী, পশ্চিমে-করিম' }
      ],
      template_html: `
        <div style="border: 2px solid #1e3a8a; padding: 5px; border-radius: 4px; min-height: 250mm; box-sizing: border-box;">
          <div style="border: 1px solid #3b82f6; padding: 22px 20px; border-radius: 3px; min-height: calc(250mm - 14px); box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="text-align: center; border-bottom: 2px solid #1e3a8a; padding-bottom: 12px; margin-bottom: 16px;">
                <div style="font-size: 13px; font-weight: 700; color: #1e3a8a; letter-spacing: 1px;">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার - সাব-রেজিস্ট্রার কার্যালয়</div>
                <div style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 4px 0;">সাফ-কবলা বা বিক্রয় দলিল</div>
                <div style="display: flex; justify-content: space-between; font-size: 12.5px; color: #475569; font-weight: 600; margin-top: 6px;">
                  <span>অফিস: {{sub_registry_office}}</span>
                  <span>তারিখ: {{deed_date}}</span>
                </div>
              </div>

              <div style="font-size: 14.5px; line-height: 1.95; color: #1e293b; text-align: justify;">
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px 14px; border-radius: 6px; margin-bottom: 14px; font-size: 13.5px;">
                  <div style="margin-bottom: 6px;"><strong>১ম পক্ষ (বিক্রেতা / দাতা):</strong> {{seller_name}}, পিতা: {{seller_father}}, ঠিকানা: {{seller_address}}, এনআইডি: {{seller_nid}}।</div>
                  <div><strong>২য় পক্ষ (ক্রেতা / গ্রহীতা):</strong> {{buyer_name}}, পিতা: {{buyer_father}}, ঠিকানা: {{buyer_address}}, এনআইডি: {{buyer_nid}}।</div>
                </div>

                <p style="margin-bottom: 12px; text-indent: 30px;">
                  কস্য সাফ-কবলা জমি বিক্রয় দলিল পত্রমিদং কার্য্যঞ্চাগে। যেহেতু ১ম পক্ষ আমি বিক্রেতা নিরূপিত তফসিল বর্ণিত সম্পত্তির নিরঙ্কুশ ও নিঃস্বত্ব মালিক থাকিয়া নিজ নামে ভোগদখলে নিযুক্ত আছি। বর্তমানে আমার বিশেষ সাংসারিক প্রয়োজনে অর্থ সংকুলানের নিমিত্তে জমি বিক্রয়ের প্রস্তাব করিলে ২য় পক্ষ আপনি ক্রেতা তাহা নগদ মূল্যে খরিদ করিতে সম্মত হন।
                </p>

                <p style="margin-bottom: 12px; text-indent: 30px;">
                  অদ্য সর্বসম্মতিক্রমে তফসিল বর্ণিত ভূমির মোট মূল্য <strong>{{total_price}}</strong> সাব্যস্ত ক্রমে ধার্যকৃত সমুদয় পণ অত্র দলিল রেজিস্ট্রির পূর্বে নগদ ক্যাশ বুঝিয়া পাইলাম। অদ্য হইতে উক্ত ভূমিতে আমার বা আমার ওয়ারিশগণের কোনো প্রকার দাবি-দাওয়া রহিল না এবং সম্পত্তির পূর্ণ মালিকানা ও দখল শান্তিপূর্ণভাবে আপনার অনুকূলে সমর্পণ করিলাম। সম্পত্তিটি কোনো ব্যাংক বা ব্যক্তির নিকট দায়বদ্ধ নহে।
                </p>

                <div style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px 14px; background: #ffffff; margin-top: 10px;">
                  <div style="font-weight: 700; color: #1e3a8a; border-bottom: 1px dashed #cbd5e1; padding-bottom: 4px; margin-bottom: 8px; font-size: 14px;">তফসিল পরিচয় ও চৌহদ্দি:</div>
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 13px;">
                    <div>• <strong>মৌজা ও জে.এল:</strong> {{mouza_jl}}</div>
                    <div>• <strong>খতিয়ান নং:</strong> {{khatian_info}}</div>
                    <div>• <strong>দাগ নং:</strong> {{dag_no}}</div>
                    <div>• <strong>জমির পরিমাণ:</strong> {{land_amount}}</div>
                  </div>
                  <div style="font-size: 13px; margin-top: 6px; border-top: 1px dashed #e2e8f0; padding-top: 6px;">
                    • <strong>চৌহদ্দি:</strong> {{boundaries}}
                  </div>
                </div>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 35px; padding-top: 10px; font-size: 13px;">
              <div style="text-align: center; width: 140px;">
                <div style="color: #94a3b8; font-size: 11px;">.....................................</div>
                <strong style="display: block; color: #0f172a;">১ম পক্ষের স্বাক্ষর</strong>
                <span style="color: #64748b; font-size: 12px;">(বিক্রেতা / দাতা)</span>
              </div>

              <div style="text-align: center; width: 140px;">
                <div style="color: #94a3b8; font-size: 11px;">.....................................</div>
                <strong style="display: block; color: #0f172a;">২য় পক্ষের স্বাক্ষর</strong>
                <span style="color: #64748b; font-size: 12px;">(ক্রেতা / গ্রহীতা)</span>
              </div>

              <div style="text-align: center; width: 140px;">
                <div style="color: #94a3b8; font-size: 11px;">.....................................</div>
                <strong style="display: block; color: #0f172a;">সাক্ষীগণের স্বাক্ষর</strong>
                <span style="color: #64748b; font-size: 12px;">১ ও ২ নং সাক্ষী</span>
              </div>

              <div style="text-align: center; width: 140px;">
                <div style="color: #94a3b8; font-size: 11px;">.....................................</div>
                <strong style="display: block; color: #0f172a;">দলিল লেখকের স্বাক্ষর</strong>
                <span style="color: #64748b; font-size: 12px;">সনদ নং সহ সিল</span>
              </div>
            </div>
          </div>
        </div>
      `
    },

    // =========================================================================
    // 3. মুসলিম বিবাহ (নিকাহ) নিবন্ধন ও কাবিননামা (Muslim Marriage Nikahnama)
    // =========================================================================
    {
      id: 'doc_4',
      title: 'মুসলিম বিবাহ (নিকাহ) নিবন্ধন ও কাবিননামা সম্পাদন প্রসঙ্গে',
      category: 'অঙ্গীকারনামা',
      language: 'বাংলা',
      description: 'মুসলিম বিবাহ ও তালাক (নিবন্ধন) বিধিমালা অনুযায়ী বর-কনের পূর্ণাঙ্গ তথ্য, দেনমোহর ও শর্তাবলী সম্বলিত প্রমিত নিকাহনামা ফরম।',
      form_fields: [
        { id: 'kazi_office', label: 'কাজী অফিস / এলাকা', type: 'text', placeholder: 'উদা: নিকাহ রেজিস্ট্রার কার্যালয়, ওয়ার্ড নং-১২, ঢাকা উত্তর' },
        { id: 'marriage_date', label: 'বিবাহের তারিখ', type: 'text', placeholder: 'উদা: ২৩/০৯/২০২৬', default_value: '২৩/০৯/২০২৬' },
        { id: 'groom_name', label: 'বরের নাম', type: 'text', placeholder: 'উদা: মো: তানভীর আহমেদ' },
        { id: 'groom_father', label: 'বরের পিতার নাম', type: 'text', placeholder: 'উদা: মো: আশরাফুল ইসলাম' },
        { id: 'groom_age', label: 'বরের বয়স ও পেশা', type: 'text', placeholder: 'উদা: ২৮ বছর, ব্যাংকার' },
        { id: 'groom_address', label: 'বরের স্থায়ী ঠিকানা', type: 'text', placeholder: 'উদা: গ্রাম: রূপনগর, থানা: মিরপুর, জেলা: ঢাকা' },
        { id: 'bride_name', label: 'কনের নাম', type: 'text', placeholder: 'উদা: ফাতেমা তুজ জোহরা' },
        { id: 'bride_father', label: 'কনের পিতার নাম', type: 'text', placeholder: 'উদা: প্রকৌশলী মো: মোশাররফ হোসেন' },
        { id: 'bride_age', label: 'কনের বয়স ও অবস্থা', type: 'text', placeholder: 'উদা: ২৪ বছর, কুমারী' },
        { id: 'bride_address', label: 'কনের স্থায়ী ঠিকানা', type: 'text', placeholder: 'উদা: বাড়ি-১২, রোড-৪, ধানমন্ডি, ঢাকা' },
        { id: 'denmohor_total', label: 'মোট দেনমোহর (টাকা)', type: 'text', placeholder: 'উদা: ১০,০০,০০০/- (দশ লক্ষ টাকা)' },
        { id: 'denmohor_paid', label: 'নগদ / উসুলকৃত দেনমোহর', type: 'text', placeholder: 'উদা: ৩,০০,০০০/- (স্বর্ণালংকার ও নগদ)' },
        { id: 'denmohor_due', label: 'বকেয়া বা মোয়াজ্জল দেনমোহর', type: 'text', placeholder: 'উদা: ৭,০০,০০০/- (সাত লক্ষ টাকা)' },
        { id: 'witness_1', label: '১ম সাক্ষীর নাম ও ঠিকানা', type: 'text', placeholder: 'উদা: মো: কামরুল হাসান, ঢাকা' },
        { id: 'witness_2', label: '২য় সাক্ষীর নাম ও ঠিকানা', type: 'text', placeholder: 'উদা: মো: মাহবুবুর রহমান, ঢাকা' },
        { id: 'kazi_name', label: 'নিকাহ রেজিস্ট্রার (কাজী)-এর নাম', type: 'text', placeholder: 'উদা: কাজী মাওলানা আবু বকর সিদ্দিক' }
      ],
      template_html: `
        <div style="border: 2px solid #831843; padding: 5px; border-radius: 4px; min-height: 250mm; box-sizing: border-box;">
          <div style="border: 1px solid #db2777; padding: 22px 20px; border-radius: 3px; min-height: calc(250mm - 14px); box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="text-align: center; border-bottom: 2px solid #831843; padding-bottom: 10px; margin-bottom: 16px;">
                <div style="font-size: 12.5px; font-weight: 700; color: #831843; letter-spacing: 0.5px;">ফর্ম নং ১ - মুসলিম বিবাহ ও তালাক (নিবন্ধন) বিধিমালা, ১৯৭৫</div>
                <div style="font-size: 21px; font-weight: 800; color: #0f172a; margin: 3px 0;">নিকাহনামা / মুসলিম বিবাহ নিবন্ধন চুক্তি</div>
                <div style="display: flex; justify-content: space-between; font-size: 12.5px; color: #475569; font-weight: 600; margin-top: 4px;">
                  <span>রেজিস্ট্রার কার্যালয়: {{kazi_office}}</span>
                  <span>বিবাহের তারিখ: {{marriage_date}}</span>
                </div>
              </div>

              <div style="font-size: 14px; line-height: 1.9; color: #1e293b;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
                  <div style="border: 1px solid #fbcfe8; background: #fff1f2; padding: 10px 14px; border-radius: 6px;">
                    <div style="font-weight: 700; color: #9f1239; margin-bottom: 4px; font-size: 13.5px; border-bottom: 1px solid #fecdd3; padding-bottom: 2px;">বরের বিবরণ (Groom):</div>
                    <div>• নাম: <strong>{{groom_name}}</strong></div>
                    <div>• পিতা: {{groom_father}}</div>
                    <div>• বয়স ও পেশা: {{groom_age}}</div>
                    <div>• ঠিকানা: {{groom_address}}</div>
                  </div>

                  <div style="border: 1px solid #fbcfe8; background: #fff1f2; padding: 10px 14px; border-radius: 6px;">
                    <div style="font-weight: 700; color: #9f1239; margin-bottom: 4px; font-size: 13.5px; border-bottom: 1px solid #fecdd3; padding-bottom: 2px;">কনের বিবরণ (Bride):</div>
                    <div>• নাম: <strong>{{bride_name}}</strong></div>
                    <div>• পিতা: {{bride_father}}</div>
                    <div>• বয়স ও অবস্থা: {{bride_age}}</div>
                    <div>• ঠিকানা: {{bride_address}}</div>
                  </div>
                </div>

                <div style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px 14px; background: #ffffff; margin-bottom: 14px;">
                  <div style="font-weight: 700; color: #831843; font-size: 13.5px; margin-bottom: 6px;">দেনমোহরের বিবরণ (Dower / Mahr):</div>
                  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; font-size: 13px;">
                    <div>• মোট দেনমোহর: <strong>{{denmohor_total}}</strong></div>
                    <div>• উসুলকৃত (নগদ/স্বর্ণ): {{denmohor_paid}}</div>
                    <div>• বকেয়া দেনমোহর: {{denmohor_due}}</div>
                  </div>
                </div>

                <p style="text-align: justify; margin-bottom: 12px; text-indent: 30px;">
                  অদ্য উল্লেখিত বর ও কনের মধ্যে ইসলামি শরিয়তের বিধান মোতাবেক উভয় পক্ষের উপস্থিতিতে পারস্পরিক সম্মতিক্রমে নির্ধারিত দেনমোহরে ইজাব ও কবুল সম্পন্ন করতঃ অত্র নিকাহনামা সম্পাদিত হইল। উভয় পক্ষ এই চুক্তির শর্তাবলীর প্রতি শ্রদ্ধাশীল থাকিয়া দাম্পত্য জীবন পরিচালনায় অঙ্গীকারবদ্ধ হইলেন।
                </p>

                <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 12px; border-radius: 6px; font-size: 12.5px;">
                  <div>• <strong>১ম সাক্ষী:</strong> {{witness_1}}</div>
                  <div>• <strong>২য় সাক্ষী:</strong> {{witness_2}}</div>
                </div>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 35px; padding-top: 10px; font-size: 13px;">
              <div style="text-align: center; width: 125px;">
                <div style="color: #94a3b8; font-size: 11px;">.................................</div>
                <strong style="display: block; color: #0f172a;">বরের স্বাক্ষর</strong>
              </div>

              <div style="text-align: center; width: 125px;">
                <div style="color: #94a3b8; font-size: 11px;">.................................</div>
                <strong style="display: block; color: #0f172a;">কনের স্বাক্ষর</strong>
              </div>

              <div style="text-align: center; width: 125px;">
                <div style="color: #94a3b8; font-size: 11px;">.................................</div>
                <strong style="display: block; color: #0f172a;">সাক্ষীগণের স্বাক্ষর</strong>
              </div>

              <div style="text-align: center; width: 145px;">
                <div style="color: #94a3b8; font-size: 11px;">.................................</div>
                <strong style="display: block; color: #0f172a;">{{kazi_name}}</strong>
                <span style="color: #64748b; font-size: 11.5px;">নিকাহ রেজিস্ট্রার ও সিল</span>
              </div>
            </div>
          </div>
        </div>
      `
    },

    // =========================================================================
    // 4. ট্রেড লাইসেন্স ইস্যুর জন্য আবেদন (Trade License Application)
    // =========================================================================
    {
      id: 'doc_6',
      title: 'ট্রেড লাইসেন্স ইস্যুর জন্য আবেদন প্রসঙ্গে',
      category: 'ট্রেড লাইসেন্স',
      language: 'বাংলা',
      description: 'সিটি কর্পোরেশন বা পৌরসভা থেকে নতুন ব্যবসা প্রতিষ্ঠান পরিচালনার নিমিত্তে ট্রেড লাইসেন্স প্রাপ্তির জন্য নির্ধারিত আবেদন ফরম।',
      form_fields: [
        { id: 'authority_office', label: 'কর্তৃপক্ষের নাম ও এলাকা', type: 'text', placeholder: 'উদা: মেয়র / নির্বাহী কর্মকর্তা, ঢাকা উত্তর সিটি কর্পোরেশন' },
        { id: 'business_name', label: 'ব্যবসা প্রতিষ্ঠানের নাম', type: 'text', placeholder: 'উদা: মেসার্স আল-মদিনা এন্টারপ্রাইজ' },
        { id: 'owner_name', label: 'স্বত্বাধিকারীর নাম', type: 'text', placeholder: 'উদা: মো: শাহ আলম' },
        { id: 'father_husband', label: 'পিতা / স্বামীর নাম', type: 'text', placeholder: 'উদা: মো: সিরাজুল হক' },
        { id: 'mother_name', label: 'মাতার নাম', type: 'text', placeholder: 'উদা: রোকেয়া বেগম' },
        { id: 'business_nature', label: 'ব্যবসার ধরন / প্রকৃতি', type: 'text', placeholder: 'উদা: পাইকারি ও খুচরা কম্পিউটার সামগ্রী ও স্টুডিও' },
        { id: 'business_address', label: 'ব্যবসার সঠিক ঠিকানা', type: 'text', placeholder: 'উদা: দোকান-৩, দ্বিতীয় তলা, নিউ মার্কেট, ঢাকা' },
        { id: 'nid_number', label: 'জাতীয় পরিচয়পত্র নম্বর', type: 'text', placeholder: 'উদা: ১৯১৮২৬৯২...' },
        { id: 'tin_number', label: 'ই-টিন নম্বর (যদি থাকে)', type: 'text', placeholder: 'উদা: ৪৭৫৯১২৩৪৫৬৭' },
        { id: 'capital_amount', label: 'প্রারম্ভিক মূলধন (টাকা)', type: 'text', placeholder: 'উদা: ৫,০০,০০০/- (পাঁচ লক্ষ টাকা)' },
        { id: 'app_date', label: 'আবেদনের তারিখ', type: 'text', placeholder: 'উদা: ২৩/০৯/২০২৬', default_value: '২৩/০৯/২০২৬' }
      ],
      template_html: `
        <div style="border: 2px solid #0284c7; padding: 5px; border-radius: 4px; min-height: 250mm; box-sizing: border-box;">
          <div style="border: 1px solid #38bdf8; padding: 24px 22px; border-radius: 3px; min-height: calc(250mm - 14px); box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="text-align: center; margin-bottom: 20px;">
                <div style="font-size: 15px; font-weight: 700; color: #0284c7;">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</div>
                <div style="font-size: 21px; font-weight: 800; color: #0f172a;">পৌরসভা / সিটি কর্পোরেশন রাজস্ব শাখা</div>
                <div style="font-size: 13.5px; color: #475569; margin-top: 2px;">ট্রেড লাইসেন্স প্রাপ্তির আনুষ্ঠানিক আবেদনপত্র</div>
              </div>

              <div style="font-size: 14.5px; line-height: 2.0; color: #1e293b; text-align: justify;">
                <p style="margin-bottom: 6px;">
                  বরাবর,<br>
                  <strong>{{authority_office}}</strong><br>
                  বিষয়: <strong>ব্যবসা পরিচালনার জন্য নতুন ট্রেড লাইসেন্স ইস্যুর আবেদন।</strong>
                </p>

                <p style="margin-top: 10px; margin-bottom: 12px; text-indent: 35px;">
                  মহোদয়, বিনীত নিবেদন এই যে, আমি নিম্নস্বাক্ষরকারী অত্র পৌরসভা/সিটি কর্পোরেশন এলাকার নির্ধারিত স্থানে নিয়মমাফিক একটি নতুন বাণিজ্যিক ব্যবসা প্রতিষ্ঠান পরিচালনা করিতে ইচ্ছুক। উক্ত ব্যবসা সুষ্ঠুভাবে পরিচালনার নিমিত্তে সরকারি নিয়মানুযায়ী একটি বৈধ ট্রেড লাইসেন্স প্রয়োজন। প্রতিষ্ঠানের প্রয়োজনীয় তথ্য নিচে উপস্থাপন করিলাম:
                </p>

                <div style="border: 1px solid #e2e8f0; background: #f8fafc; border-radius: 6px; padding: 12px 16px; margin: 14px 0; font-size: 14px; line-height: 1.8;">
                  <div>১. ব্যবসা প্রতিষ্ঠানের নাম: <strong>{{business_name}}</strong></div>
                  <div>২. স্বত্বাধিকারীর পূর্ণ নাম: <strong>{{owner_name}}</strong></div>
                  <div>৩. পিতা/স্বামীর নাম: {{father_husband}}, মাতার নাম: {{mother_name}}</div>
                  <div>৪. ব্যবসার ধরন / খাত: <strong>{{business_nature}}</strong></div>
                  <div>৫. ব্যবসার পূর্ণ ঠিকানা: {{business_address}}</div>
                  <div>৬. জাতীয় পরিচয়পত্র নং: {{nid_number}} | ই-টিন: {{tin_number}}</div>
                  <div>৭. ব্যবসায়ে বিনিয়োগকৃত মূলধন: {{capital_amount}}</div>
                </div>

                <p style="margin-bottom: 0; text-indent: 35px;">
                  অতএব, মহোদয়ের নিকট বিনীত প্রার্থনা, সার্বিক বিবেচনাপূর্বক সরেজমিনে পরিদর্শন সাপেক্ষে নির্ধারিত ফি গ্রহণ করিয়া আমার অনুকূলে একটি ট্রেড লাইসেন্স ইস্যু করিতে আপনার সদয় মর্জি হয়।
                </p>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px; padding-top: 10px; font-size: 13.5px;">
              <div>
                <span>তারিখ: {{app_date}}</span><br>
                <span style="color: #64748b; font-size: 12px;">সংযুক্তি: এনআইডি, ছবি, ভাড়াচুক্তি কপি</span>
              </div>
              <div style="text-align: center; min-width: 170px;">
                <div style="color: #94a3b8; font-size: 12px;">............................................</div>
                <strong style="display: block; color: #0f172a;">{{owner_name}}</strong>
                <span style="color: #64748b; font-size: 12px;">আবেদনকারীর স্বাক্ষর ও মোবাইল</span>
              </div>
            </div>
          </div>
        </div>
      `
    },

    // =========================================================================
    // 5. রাষ্ট্রীয় সম্মানী ভাতা প্রাপ্তির জন্য আবেদন (Freedom Fighter Allowance)
    // =========================================================================
    {
      id: 'doc_3',
      title: 'রাষ্ট্রীয় সম্মানী ভাতা প্রাপ্তির জন্য আবেদন প্রসঙ্গে',
      category: 'আবেদনপত্র',
      language: 'বাংলা',
      description: 'বীর মুক্তিযোদ্ধা, শহীদ পরিবার বা বিশেষ অবদানের স্বীকৃতিস্বরূপ সরকারি রাষ্ট্রীয় সম্মানী ভাতা প্রাপ্তির আনুষ্ঠানিক আবেদনপত্র।',
      form_fields: [
        { id: 'recipient_office', label: 'আবেদন প্রাপক', type: 'text', placeholder: 'উদা: উপজেলা নির্বাহী অফিসার / সমাজসেবা অফিসার' },
        { id: 'applicant_name', label: 'আবেদনকারীর নাম', type: 'text', placeholder: 'উদা: বীর মুক্তিযোদ্ধা মো: আক্তার হোসেন' },
        { id: 'father_name', label: 'পিতার নাম', type: 'text', placeholder: 'উদা: মৃত আব্দুল গফুর' },
        { id: 'gazette_no', label: 'মুক্তিযোদ্ধা গেজেট / সনদ নং', type: 'text', placeholder: 'উদা: গেজেট নং: ১২৩৪, লাল মুক্তিবার্তা: ৫৬৭৮৯' },
        { id: 'sector_no', label: 'মুক্তিযুদ্ধে অংশগ্রহণকারী সেক্টর', type: 'text', placeholder: 'উদা: সেক্টর নং-২ (মেজর খালেদ মোশাররফ)' },
        { id: 'permanent_address', label: 'স্থায়ী ঠিকানা', type: 'text', placeholder: 'উদা: গ্রাম: হরিণধরা, ডাকঘর: তেঁতুলঝোড়া, উপজেলা: সাভার, ঢাকা' },
        { id: 'bank_account', label: 'ব্যাংক হিসাব ও শাখার নাম', type: 'text', placeholder: 'উদা: সোনালী ব্যাংক লি:, সাভার শাখা, হিসাব: ০১...' },
        { id: 'app_date', label: 'তারিখ', type: 'text', placeholder: 'উদা: ২৩/০৯/২০২৬', default_value: '২৩/০৯/২০২৬' }
      ],
      template_html: `
        <div style="border: 2px solid #15803d; padding: 5px; border-radius: 4px; min-height: 250mm; box-sizing: border-box;">
          <div style="border: 1px solid #22c55e; padding: 24px 22px; border-radius: 3px; min-height: calc(250mm - 14px); box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="text-align: center; margin-bottom: 20px;">
                <div style="font-size: 15px; font-weight: 700; color: #15803d;">মুক্তিযুদ্ধ বিষয়ক মন্ত্রণালয় - গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</div>
                <div style="font-size: 21px; font-weight: 800; color: #042f2e;">রাষ্ট্রীয় সম্মানী ভাতা প্রাপ্তির আবেদন ফরম</div>
              </div>

              <div style="font-size: 14.5px; line-height: 2.0; color: #1e293b; text-align: justify;">
                <p>বরাবর,<br><strong>{{recipient_office}}</strong><br>বিষয়: <strong>সরকারি নীতিমালা মোতাবেক বীর মুক্তিযোদ্ধা সম্মানী ভাতা প্রাপ্তির আবেদন।</strong></p>
                <p style="text-indent: 35px;">মহোদয়, সশ্রদ্ধ নিবেদন এই যে, আমি নিম্নস্বাক্ষরকারী একজন তালিকাভুক্ত বীর মুক্তিযোদ্ধা। মহান ১৯৭১ সালের মুক্তিযুদ্ধে সক্রিয়ভাবে অংশগ্রহণ করিয়াছি। আমার সনদ ও পরিচয় সংক্রান্ত তথ্যাবলী নিম্নরূপ:</p>
                <div style="border: 1px solid #bbf7d0; background: #f0fdf4; border-radius: 6px; padding: 12px 16px; margin: 14px 0; font-size: 14px; line-height: 1.8;">
                  <div>১. বীর মুক্তিযোদ্ধার নাম: <strong>{{applicant_name}}</strong></div>
                  <div>২. পিতার নাম: {{father_name}}</div>
                  <div>৩. মুক্তিযোদ্ধা গেজেট ও সনদ নম্বর: <strong>{{gazette_no}}</strong></div>
                  <div>৪. যুদ্ধের সেক্টর / অঞ্চল: {{sector_no}}</div>
                  <div>৫. স্থায়ী ঠিকানা: {{permanent_address}}</div>
                  <div>৬. ভাতা প্রেরণের ব্যাংক অ্যাকাউন্ট: {{bank_account}}</div>
                </div>
                <p style="text-indent: 35px;">অতএব, বিনীত প্রার্থনা, উল্লিখিত তথ্যাবলী যাচাইপূর্বক সরকারের রাষ্ট্রীয় সম্মানী ভাতা তালিকাভুক্ত করিয়া নিয়মিত ভাতা প্রেরণের ব্যবস্থা গ্রহণ করিতে সদয় মর্জি হয়।</p>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px; font-size: 13.5px;">
              <span>তারিখ: {{app_date}}</span>
              <div style="text-align: center; min-width: 170px;">
                <div style="color: #94a3b8; font-size: 12px;">............................................</div>
                <strong>{{applicant_name}}</strong>
                <span style="color: #64748b; font-size: 12px; display: block;">আবেদনকারীর স্বাক্ষর</span>
              </div>
            </div>
          </div>
        </div>
      `
    },

    // =========================================================================
    // 6. জাতীয় পরিচয়পত্র সংশোধনের জন্য প্রত্যয়নপত্র (NID Correction Certificate)
    // =========================================================================
    {
      id: 'doc_10',
      title: 'জাতীয় পরিচয়পত্র সংশোধনের জন্য প্রত্যয়নপত্র',
      category: 'প্রত্যয়ন পত্র',
      language: 'বাংলা',
      description: 'জাতীয় পরিচয়পত্রে নাম, পিতা-মাতার নাম বা জন্ম তারিখ সংশোধনের জন্য স্থানীয় জনপ্রতিনিধি (চেয়ারম্যান/কাউন্সিলর) কর্তৃক প্রত্যয়নপত্র।',
      form_fields: [
        { id: 'applicant_name', label: 'প্রকৃত সঠিক নাম', type: 'text', placeholder: 'উদা: মো: ফজলুর রহমান' },
        { id: 'father_name', label: 'পিতার সঠিক নাম', type: 'text', placeholder: 'উদা: মৃত আব্দুল জব্বার' },
        { id: 'mother_name', label: 'মাতার সঠিক নাম', type: 'text', placeholder: 'উদা: মোছা: জমিলা খাতুন' },
        { id: 'current_nid', label: 'বর্তমান ভুল NID নম্বর', type: 'text', placeholder: 'উদা: ১৯৫৭২৬১২৩৪৫৬৭' },
        { id: 'incorrect_entry', label: 'ভুলভাবে যা লিপিবদ্ধ আছে', type: 'text', placeholder: 'উদা: জন্ম তারিখ ০১/০১/১৯৫৮ এর স্থলে ভুলবশত ০১/০১/১৯৬৮ হয়েছে' },
        { id: 'correct_entry', label: 'প্রকৃত সঠিক তথ্য', type: 'text', placeholder: 'উদা: ০১/০১/১৯৫৮ (জন্ম নিবন্ধন ও এসএসসি সনদ অনুযায়ী)' },
        { id: 'issue_date', label: 'প্রত্যয়নের তারিখ', type: 'text', placeholder: 'উদা: ২৩/০৯/২০২৬', default_value: '২৩/০৯/২০২৬' }
      ],
      template_html: `
        <div style="border: 2px solid #0f766e; padding: 5px; border-radius: 4px; min-height: 250mm; box-sizing: border-box;">
          <div style="border: 1px solid #14b8a6; padding: 24px 22px; border-radius: 3px; min-height: calc(250mm - 14px); box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="text-align: center; margin-bottom: 20px;">
                <div style="font-size: 15px; font-weight: 700; color: #0f766e;">ইউনিয়ন পরিষদ / পৌরসভা কার্যালয়</div>
                <div style="font-size: 21px; font-weight: 800; color: #042f2e;">জাতীয় পরিচয়পত্র সংশোধনের প্রত্যয়ন পত্র</div>
                <div style="font-size: 13px; color: #64748b; margin-top: 4px;">তারিখ: {{issue_date}}</div>
              </div>
              <div style="font-size: 15px; line-height: 2.0; color: #1e293b; text-align: justify;">
                <p style="text-indent: 35px;">এই মর্মে প্রত্যয়ন করা যাইতেছে যে, {{applicant_name}}, পিতা: {{father_name}}, মাতা: {{mother_name}} অত্র এলাকার একজন স্থায়ী নাগরিক। তাঁহার জাতীয় পরিচয়পত্র নং: <strong>{{current_nid}}</strong>-এ ভুলবশত <strong>{{incorrect_entry}}</strong> লিপিবদ্ধ হইয়াছে।</p>
                <p style="text-indent: 35px;">স্থানীয়ভাবে অনুসন্ধান ও প্রাতিষ্ঠানিক কাগজপত্র যাচাই করিয়া নিশ্চিত হওয়া গেল যে, তাঁহার প্রকৃত সঠিক তথ্য হইবে: <strong>{{correct_entry}}</strong>। তিনি কোনো অসদুপায় অবলম্বন করেন নাই।</p>
                <p style="text-indent: 35px;">নির্বাচন কমিশন কর্তৃক তাঁহার জাতীয় পরিচয়পত্রে উল্লেখিত ভুল সংশোধন করতঃ নূতন কার্ড প্রদান করিবার সুপারিশ করা হইল।</p>
              </div>
            </div>
            <div style="display: flex; justify-content: flex-end; margin-top: 50px;">
              <div style="text-align: center; min-width: 180px;">
                <div style="color: #94a3b8; font-size: 12px;">............................................</div>
                <strong style="display: block;">চেয়ারম্যান / কাউন্সিলর</strong>
                <span style="font-size: 12px; color: #64748b;">স্বাক্ষর ও অফিশিয়াল সিল</span>
              </div>
            </div>
          </div>
        </div>
      `
    },

    // =========================================================================
    // 7. আপীলকারী ও রেসপন্ডেন্টের পারস্পরিক মীমাংসা (Court Compromise Settlement)
    // =========================================================================
    {
      id: 'doc_1',
      title: 'আপীলকারী ও রেসপন্ডেন্টের পারস্পরিক মীমাংসার ভিত্তিতে আপীল নিষ্পত্তির প্রার্থনা।',
      category: 'মামলা',
      language: 'বাংলা',
      description: 'আদালতে আপীল মামলা চলাকালীন উভয় পক্ষের পারস্পরিক সমঝোতা ও আপোষ মীমাংসার ভিত্তিতে মামলাটি নিষ্পত্তির জন্য যৌথ আবেদন ফরম।',
      form_fields: [
        { id: 'court_name', label: 'বিজ্ঞ আদালতের নাম', type: 'text', placeholder: 'উদা: বিজ্ঞ জেলা ও দায়রা জজ আদালত, ঢাকা' },
        { id: 'case_number', label: 'আপীল মোকদ্দমা নম্বর ও সন', type: 'text', placeholder: 'উদা: দেওয়ানী আপীল নং: ১২৫/২০২৪' },
        { id: 'appellant_name', label: 'আপীলকারীর নাম', type: 'text', placeholder: 'উদা: মো: মজিবুর রহমান' },
        { id: 'respondent_name', label: 'রেসপন্ডেন্টের নাম', type: 'text', placeholder: 'উদা: হাজী আব্দুস সাত্তার' },
        { id: 'settlement_terms', label: 'মীমাংসার মূল শর্তাবলী', type: 'text', placeholder: 'উদা: বিরোধীয় জমির দক্ষিণ অংশ আপীলকারী এবং উত্তর অংশ রেসপন্ডেন্ট গ্রহণ করিবেন' },
        { id: 'submission_date', label: 'আবেদনের তারিখ', type: 'text', placeholder: 'উদা: ২৩/০৯/২০২৬', default_value: '২৩/০৯/২০২৬' }
      ],
      template_html: `
        <div style="border: 2px solid #4338ca; padding: 5px; border-radius: 4px; min-height: 250mm; box-sizing: border-box;">
          <div style="border: 1px solid #6366f1; padding: 24px 22px; border-radius: 3px; min-height: calc(250mm - 14px); box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="text-align: center; margin-bottom: 20px;">
                <div style="font-size: 16px; font-weight: 800; color: #312e81;">বিজ্ঞ {{court_name}}</div>
                <div style="font-size: 14px; font-weight: 700; color: #4338ca; margin-top: 4px;">মোকদ্দমা: {{case_number}}</div>
              </div>
              <div style="font-size: 14.5px; line-height: 1.95; color: #1e293b; text-align: justify;">
                <div style="margin-bottom: 12px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 12px; border-radius: 4px;">
                  <div><strong>আপীলকারী:</strong> {{appellant_name}} —বনাম— <strong>রেসপন্ডেন্ট:</strong> {{respondent_name}}</div>
                </div>
                <p>বিষয়: <strong>উভয় পক্ষের আপোষ মীমাংসামূলে আপীল নিষ্পত্তির যৌথ প্রার্থনা পত্র।</strong></p>
                <p style="text-indent: 30px;">বিনীত নিবেদন এই যে, অত্র মোকদ্দমার বাদী ও বিবাদী স্থানীয় গণ্যমান্য ব্যক্তিবর্গের মধ্যস্থতায় বিরোধীয় বিষয়াদি পারস্পরিক আলোচনা সাপেক্ষে নিঃশর্তভাবে আপোষ মীমাংসায় উপনীত হইয়াছেন। আপোষের মূল শর্তাবলী নিম্নরূপ: <strong>{{settlement_terms}}</strong>।</p>
                <p style="text-indent: 30px;">উভয় পক্ষ স্বেচ্ছায় ও সুস্থ মস্তিষ্কে অত্র আপোষনামায় স্বাক্ষর প্রদান করিলেন। কোনো পক্ষের আর কোনো আপত্তি নাই।</p>
                <p style="text-indent: 30px;">অতএব, প্রার্থনা— উক্ত আপোষনামার শর্তানুযায়ী মোকদ্দমাটি নিষ্পত্তি করিয়া ডিক্রি জারির সদয় আদেশ হয়।</p>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 40px; font-size: 13px;">
              <div style="text-align: center;"><strong>আপীলকারীর স্বাক্ষর</strong></div>
              <div>তারিখ: {{submission_date}}</div>
              <div style="text-align: center;"><strong>রেসপন্ডেন্টের স্বাক্ষর</strong></div>
            </div>
          </div>
        </div>
      `
    },

    // =========================================================================
    // 8. পিক আপ গাড়ী বায়না দলিল (Vehicle Advance Sale Deed)
    // =========================================================================
    {
      id: 'doc_7',
      title: 'পিক আপ গাড়ী বায়না দলিল',
      category: 'দলিল',
      language: 'বাংলা',
      description: 'পিকআপ ভ্যান বা বাণিজ্যিক যানবাহন ক্রয়-বিক্রয়ের প্রাক্কালে অগ্রিম বায়না অর্থ পরিশোধ ও শর্তাবলীর প্রাথমিক বায়নাপত্র দলিল।',
      form_fields: [
        { id: 'seller_name', label: 'গাড়ির বর্তমান মালিক (বিক্রেতা)', type: 'text', placeholder: 'উদা: মো: দেলোয়ার হোসেন' },
        { id: 'buyer_name', label: 'ক্রেতার নাম', type: 'text', placeholder: 'উদা: মো: জসিম উদ্দিন' },
        { id: 'vehicle_reg', label: 'গাড়ির রেজিস্ট্রেশন নম্বর', type: 'text', placeholder: 'উদা: ঢাকা মেট্রো-ন-১১-২৩৪৫' },
        { id: 'chassis_engine', label: 'চেসিস ও ইঞ্জিন নম্বর', type: 'text', placeholder: 'উদা: চেসিস: TATA-12345, ইঞ্জিন: ENG-67890' },
        { id: 'total_price', label: 'মোট চুক্তিমূল্য (টাকা)', type: 'text', placeholder: 'উদা: ৮,৫০,০০০/- (আট লক্ষ পঞ্চাশ হাজার)' },
        { id: 'earnest_money', label: 'অগ্রিম বায়না পরিশোধ', type: 'text', placeholder: 'উদা: ২,০০,০০০/- (দুই লক্ষ টাকা নগদ)' },
        { id: 'due_date', label: 'বকেয়া পরিশোধ ও হস্তান্তরের তারিখ', type: 'text', placeholder: 'উদা: ১৫/১০/২০২৬' }
      ],
      template_html: `
        <div style="border: 2px solid #b45309; padding: 5px; border-radius: 4px; min-height: 250mm; box-sizing: border-box;">
          <div style="border: 1px solid #f59e0b; padding: 24px 22px; border-radius: 3px; min-height: calc(250mm - 14px); box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="text-align: center; border-bottom: 2px solid #b45309; padding-bottom: 10px; margin-bottom: 16px;">
                <div style="font-size: 20px; font-weight: 800; color: #78350f;">পিকআপ গাড়ী বিক্রয়ের চুক্তিপত্র ও বায়না দলিল</div>
              </div>
              <div style="font-size: 14.5px; line-height: 2.0; color: #1e293b; text-align: justify;">
                <p>১ম পক্ষ বিক্রেতা: <strong>{{seller_name}}</strong> এবং ২য় পক্ষ ক্রেতা: <strong>{{buyer_name}}</strong>।</p>
                <p style="text-indent: 30px;">১ম পক্ষের মালিকানাধীন পিকআপ গাড়ি (রেজি নং: <strong>{{vehicle_reg}}</strong>, চেসিস ও ইঞ্জিন: <strong>{{chassis_engine}}</strong>) বিক্রয় প্রস্তাবে ২য় পক্ষ মোট <strong>{{total_price}}</strong> চুক্তিমূল্যে ক্রয় করিতে সম্মত হইলেন।</p>
                <p style="text-indent: 30px;">অদ্য ১ম পক্ষ অগ্রিম বায়না বাবদ <strong>{{earnest_money}}</strong> গ্রহণ করিলেন। অবশিষ্ট টাকা আগামী <strong>{{due_date}}</strong> তারিখের মধ্যে পরিশোধ করিয়া গাড়ি ও বিআরটিএ কাগজপত্র নামজারি গ্রহণ করিবেন।</p>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 40px;">
              <div style="text-align: center;"><strong>বিক্রেতার স্বাক্ষর</strong></div>
              <div style="text-align: center;"><strong>ক্রেতার স্বাক্ষর</strong></div>
              <div style="text-align: center;"><strong>সাক্ষীগণের স্বাক্ষর</strong></div>
            </div>
          </div>
        </div>
      `
    },

    // =========================================================================
    // 9. কারখানা ভাড়াটিয়া চুক্তিপত্র দলিল (Factory Rental Agreement)
    // =========================================================================
    {
      id: 'doc_8',
      title: 'কারখানা ভাড়াটিয়া চুক্তিপত্র দলিল',
      category: 'চুক্তিপত্র',
      language: 'বাংলা',
      description: 'শিল্প কারখানা, ওয়ার্কশপ বা শেড দীর্ঘমেয়াদী ভাড়া প্রদান সংক্রান্ত শর্তাবলী, বিদ্যুৎ-গ্যাস বিল ও জামানতের বিস্তারিত চুক্তিপত্র দলিল।',
      form_fields: [
        { id: 'landlord_name', label: 'কারখানার মালিক (১ম পক্ষ)', type: 'text', placeholder: 'উদা: হাজী মো: ইসমাইল হোসেন' },
        { id: 'tenant_name', label: 'ভাড়াটিয়ার নাম (২য় পক্ষ)', type: 'text', placeholder: 'উদা: টেক্সটাইল ডাইং ইন্ডাস্ট্রিজ লি:' },
        { id: 'factory_location', label: 'কারখানা শেডের অবস্থান ও সাইজ', type: 'text', placeholder: 'উদা: প্লট-৭, বিসিক শিল্পনগরী, টঙ্গী (৫,০০০ বর্গফুট)' },
        { id: 'monthly_rent', label: 'মাসিক ভাড়া', type: 'text', placeholder: 'উদা: ৭৫,০০০/- (পঁচাত্তর হাজার টাকা)' },
        { id: 'security_deposit', label: 'অফেরতযোগ্য/ফেরতযোগ্য জামানত', type: 'text', placeholder: 'উদা: ৫,০০,০০০/- (পাঁচ লক্ষ টাকা)' },
        { id: 'contract_duration', label: 'চুক্তির মেয়াদ', type: 'text', placeholder: 'উদা: ৩ (তিন) বৎসর' }
      ],
      template_html: `
        <div style="border: 2px solid #047857; padding: 5px; border-radius: 4px; min-height: 250mm; box-sizing: border-box;">
          <div style="border: 1px solid #10b981; padding: 24px 22px; border-radius: 3px; min-height: calc(250mm - 14px); box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="text-align: center; border-bottom: 2px solid #047857; padding-bottom: 10px; margin-bottom: 16px;">
                <div style="font-size: 20px; font-weight: 800; color: #064e3b;">শিল্প কারখানা ও শেড ভাড়া চুক্তিপত্র</div>
              </div>
              <div style="font-size: 14.5px; line-height: 2.0; color: #1e293b; text-align: justify;">
                <p>মালিক: <strong>{{landlord_name}}</strong> এবং ভাড়াটিয়া: <strong>{{tenant_name}}</strong>।</p>
                <p style="text-indent: 30px;">তফসিল বর্ণিত কারখানা শেড (অবস্থান: <strong>{{factory_location}}</strong>) মাসিক <strong>{{monthly_rent}}</strong> ভাড়ায় আগামী <strong>{{contract_duration}}</strong> মেয়াদের জন্য চুক্তিভুক্ত হইল।</p>
                <p style="text-indent: 30px;">ভাড়াটিয়া জামানত বাবদ <strong>{{security_deposit}}</strong> প্রদান করিলেন যাহা চুক্তি শেষে ফেরতযোগ্য হইবে। বিদ্যুৎ ও গ্যাস বিল ভাড়াটিয়া নিজে বহন করিবেন।</p>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 40px;">
              <div style="text-align: center;"><strong>মালিকের স্বাক্ষর</strong></div>
              <div style="text-align: center;"><strong>ভাড়াটিয়ার স্বাক্ষর</strong></div>
              <div style="text-align: center;"><strong>সাক্ষীগণ</strong></div>
            </div>
          </div>
        </div>
      `
    },

    // =========================================================================
    // 10. ইমাম পদে নিয়োগের আবেদন (Imam Job Application)
    // =========================================================================
    {
      id: 'doc_9',
      title: 'ইমাম পদে নিয়োগের আবেদন।',
      category: 'আবেদনপত্র',
      language: 'বাংলা',
      description: 'মসজিদ পরিচালনা কমিটির সমীপে খতিব বা পেশ ইমাম পদে নিয়োগ প্রাপ্তির উদ্দেশ্যে শিক্ষাগত যোগ্যতা ও অভিজ্ঞতার বিবরণী সহ আবেদন।',
      form_fields: [
        { id: 'mosque_name', label: 'মসজিদ কমিটির নাম ও ঠিকানা', type: 'text', placeholder: 'উদা: সভাপতি, বায়তুল আমান জামে মসজিদ, বনানী, ঢাকা' },
        { id: 'applicant_name', label: 'প্রার্থীর নাম', type: 'text', placeholder: 'উদা: মাওলানা হাফেজ মো: মাহমুদুল হাসান' },
        { id: 'education_qawmi_alia', label: 'শিক্ষাগত যোগ্যতা (দাওরায়ে হাদিস/কামিল)', type: 'text', placeholder: 'উদা: দাওরায়ে হাদিস (মুমতাজ), আল-হাইআতুল উলয়া' },
        { id: 'experience_years', label: 'ইমামতি ও খিদমতের অভিজ্ঞতা', type: 'text', placeholder: 'উদা: ৫ বছর পেশ ইমাম ও খতিব হিসেবে অভিজ্ঞতা' },
        { id: 'mobile_number', label: 'যোগাযোগের মোবাইল নম্বর', type: 'text', placeholder: 'উদা: ০১৭xxxxxxxx' }
      ],
      template_html: `
        <div style="border: 2px solid #065f46; padding: 5px; border-radius: 4px; min-height: 250mm; box-sizing: border-box;">
          <div style="border: 1px solid #059669; padding: 24px 22px; border-radius: 3px; min-height: calc(250mm - 14px); box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="text-align: center; margin-bottom: 20px;">
                <div style="font-size: 21px; font-weight: 800; color: #064e3b;">পেশ ইমাম / খতিব পদে নিয়োগের আবেদন</div>
              </div>
              <div style="font-size: 14.5px; line-height: 2.0; color: #1e293b; text-align: justify;">
                <p>বরাবর,<br><strong>{{mosque_name}}</strong><br>বিষয়: <strong>পেশ ইমাম ও খতিব পদে নিয়োগের জন্য আবেদন।</strong></p>
                <p style="text-indent: 30px;">মহোদয়, আপনাদের মসজিদের প্রকাশিত বিজ্ঞপ্তির প্রেক্ষিতে আমি উক্ত পদে খেদমত করিতে আগ্রহী। আমার যোগ্যতা: <strong>{{education_qawmi_alia}}</strong> এবং পূর্ব অভিজ্ঞতা: <strong>{{experience_years}}</strong>।</p>
                <p style="text-indent: 30px;">অতএব, আবেদন বিবেচনাপূর্বক আমাকে খেদমতের সুযোগদানে বাধিত করিবেন।</p>
              </div>
            </div>
            <div style="display: flex; justify-content: flex-end; margin-top: 40px;">
              <div style="text-align: center;">
                <strong>{{applicant_name}}</strong><br>
                <span>মোবাইল: {{mobile_number}}</span>
              </div>
            </div>
          </div>
        </div>
      `
    },

    // =========================================================================
    // 11. এতিম ও অসহায় শিক্ষার্থীদের ইফতার ও খাদ্য সহায়তার আবেদন
    // =========================================================================
    {
      id: 'doc_11',
      title: 'এতিম ও অসহায় শিক্ষার্থীদের ইফতার ও খাদ্য সহায়তার আবেদন।',
      category: 'আবেদনপত্র',
      language: 'বাংলা',
      description: 'মাদরাসা বা এতিমখানার দরিদ্র ও এতিম শিক্ষার্থীদের জন্য রমজানের ইফতার ও খাদ্য সহায়তা প্রদানের অনুদান প্রার্থনা ফরম।',
      form_fields: [
        { id: 'madrasa_name', label: 'মাদরাসা / এতিমখানার নাম', type: 'text', placeholder: 'উদা: দারুল উলুম খাদিমুল ইসলাম এতিমখানা' },
        { id: 'orphan_count', label: 'এতিম শিক্ষার্থীর সংখ্যা', type: 'text', placeholder: 'উদা: ১২০ জন' },
        { id: 'requested_aid', label: 'প্রয়োজনীয় খাদ্য / অনুদান সহায়তা', type: 'text', placeholder: 'উদা: চাল, ডাল, তেল ও রমজানের ইফতার সামগ্রী' },
        { id: 'contact_person', label: 'মুহতামিম / সম্পাদকের নাম', type: 'text', placeholder: 'উদা: মাওলানা আব্দুল ওয়াহাব' }
      ],
      template_html: `
        <div style="border: 2px solid #0d9488; padding: 5px; border-radius: 4px; min-height: 250mm; box-sizing: border-box;">
          <div style="border: 1px solid #14b8a6; padding: 24px 22px; border-radius: 3px; min-height: calc(250mm - 14px); box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="text-align: center; margin-bottom: 20px;">
                <div style="font-size: 21px; font-weight: 800; color: #115e59;">এতিম শিক্ষার্থীদের ইফতার ও খাদ্য সহায়তার আবেদন</div>
                <div style="font-size: 14px; color: #475569; margin-top: 4px;">{{madrasa_name}}</div>
              </div>
              <div style="font-size: 15px; line-height: 2.0; color: #1e293b; text-align: justify;">
                <p style="text-indent: 30px;">শ্রদ্ধেয় দানশীল ভাই ও বোনদের সমীপে বিনীত নিবেদন, অত্র প্রতিষ্ঠানে বর্তমানে <strong>{{orphan_count}}</strong> জন নিঃস্ব ও এতিম শিক্ষার্থী অবস্থান করিতেছে। তাহাদের পবিত্র মাহে রমজানের সেহরি ও ইফতার সুচারুরূপে পরিচালনার জন্য <strong>{{requested_aid}}</strong> অতীব জরুরি।</p>
                <p style="text-indent: 30px;">উক্ত নেক আমল ও সদকায়ে জারিয়ায় আপনাদের মুক্তহস্তে সাহায্যের হাত বাড়ানোর বিনীত আবেদন জানাইতেছি।</p>
              </div>
            </div>
            <div style="display: flex; justify-content: flex-end; margin-top: 40px;">
              <div style="text-align: center;">
                <strong>{{contact_person}}</strong><br>
                <span>মুহতামিম / পরিচালক</span>
              </div>
            </div>
          </div>
        </div>
      `
    },

    // =========================================================================
    // 12. মেশিন বা যন্ত্রপাতি বিক্রয়নামা দলিল (Industrial Machinery Sale Deed)
    // =========================================================================
    {
      id: 'doc_12',
      title: 'মেশিন বা যন্ত্রপাতি বিক্রয়নামা দলিল',
      category: 'দলিল',
      language: 'বাংলা',
      description: 'শিল্প কারখানা বা বাণিজ্যিক প্রতিষ্ঠানের ব্যবহৃত ও নতুন ভারী যন্ত্রপাতি, মেশিন ও উপকরণ বিক্রয় ও মালিকানা হস্তান্তরের দলিল।',
      form_fields: [
        { id: 'seller_company', label: 'বিক্রেতা কোম্পানি / স্বত্বাধিকারী', type: 'text', placeholder: 'উদা: প্রাইম প্লাস্টিক ইন্ডাস্ট্রিজ' },
        { id: 'buyer_company', label: 'ক্রেতা কোম্পানি / স্বত্বাধিকারী', type: 'text', placeholder: 'উদা: গ্লোবাল প্যাকেজিং লিমিটেড' },
        { id: 'machine_details', label: 'যন্ত্রপাতির নাম, মডেল ও ব্র্যান্ড', type: 'text', placeholder: 'উদা: হেভি ডিউটি হাইড্রোলিক প্রেস মেশিন (মডেল: HP-200T)' },
        { id: 'total_cost', label: 'মোট বিক্রয় মূল্য', type: 'text', placeholder: 'উদা: ১৮,০০,০০০/- (আঠারো লক্ষ টাকা)' }
      ],
      template_html: `
        <div style="border: 2px solid #334155; padding: 5px; border-radius: 4px; min-height: 250mm; box-sizing: border-box;">
          <div style="border: 1px solid #64748b; padding: 24px 22px; border-radius: 3px; min-height: calc(250mm - 14px); box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="text-align: center; border-bottom: 2px solid #334155; padding-bottom: 10px; margin-bottom: 16px;">
                <div style="font-size: 20px; font-weight: 800; color: #1e293b;">যন্ত্রপাতি ও ভারী মেশিন বিক্রয় চুক্তিপত্র</div>
              </div>
              <div style="font-size: 14.5px; line-height: 2.0; color: #1e293b; text-align: justify;">
                <p>১ম পক্ষ বিক্রেতা: <strong>{{seller_company}}</strong> এবং ২য় পক্ষ ক্রেতা: <strong>{{buyer_company}}</strong>।</p>
                <p style="text-indent: 30px;">১ম পক্ষ তাহাদের ব্যবহৃত <strong>{{machine_details}}</strong> মোট <strong>{{total_cost}}</strong> মূল্যে ২য় পক্ষের নিকট সচল অবস্থায় বিক্রয় করিলেন। ২য় পক্ষ মূল্য পরিশোধপূর্বক মেশিনের দখল বুঝিয়া লইলেন।</p>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 40px;">
              <div style="text-align: center;"><strong>বিক্রেতার সিল ও স্বাক্ষর</strong></div>
              <div style="text-align: center;"><strong>ক্রেতার সিল ও স্বাক্ষর</strong></div>
            </div>
          </div>
        </div>
      `
    },

    // =========================================================================
    // 13. মুসলিম নিকাহ নামা ফর্ম English (Nikahnama English Version)
    // =========================================================================
    {
      id: 'doc_5',
      title: 'মুসলিম নিকাহ নামা ফর্ম English',
      category: 'অঙ্গীকারনামা',
      language: 'ইংরেজি',
      description: 'Official English version format of Muslim Marriage Contract (Nikahnama) with dower, witnesses, and legal declarations.',
      form_fields: [
        { id: 'groom_name', label: 'Groom Name', type: 'text', placeholder: 'e.g. Md. Tanvir Ahmed' },
        { id: 'bride_name', label: 'Bride Name', type: 'text', placeholder: 'e.g. Fatema Tuz Zohra' },
        { id: 'dower_amount', label: 'Total Dower (BDT)', type: 'text', placeholder: 'e.g. BDT 1,000,000/-' },
        { id: 'kazi_name', label: 'Muslim Marriage Registrar', type: 'text', placeholder: 'e.g. Kazi Abu Bakar Siddique' }
      ],
      template_html: `
        <div style="border: 2px solid #1e293b; padding: 5px; border-radius: 4px; min-height: 250mm; box-sizing: border-box; font-family: 'Plus Jakarta Sans', sans-serif;">
          <div style="border: 1px solid #475569; padding: 24px 22px; border-radius: 3px; min-height: calc(250mm - 14px); box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="text-align: center; border-bottom: 2px solid #1e293b; padding-bottom: 12px; margin-bottom: 16px;">
                <div style="font-size: 13px; font-weight: 700; color: #475569; letter-spacing: 1px;">GOVERNMENT OF THE PEOPLE'S REPUBLIC OF BANGLADESH</div>
                <div style="font-size: 21px; font-weight: 800; color: #0f172a; margin-top: 4px;">CERTIFICATE OF MUSLIM MARRIAGE (NIKAHNAMA)</div>
              </div>
              <div style="font-size: 14.5px; line-height: 2.0; color: #1e293b;">
                <p>This is to certify that marriage was solemnized between <strong>{{groom_name}}</strong> (Groom) and <strong>{{bride_name}}</strong> (Bride) in accordance with Muslim Marriages and Divorces (Registration) Act.</p>
                <div style="border: 1px solid #cbd5e1; background: #f8fafc; padding: 12px 16px; border-radius: 6px; margin: 16px 0;">
                  <div>• Groom: <strong>{{groom_name}}</strong></div>
                  <div>• Bride: <strong>{{bride_name}}</strong></div>
                  <div>• Total Dower (Mahr): <strong>{{dower_amount}}</strong></div>
                </div>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 40px;">
              <div style="text-align: center;"><strong>Signature of Groom</strong></div>
              <div style="text-align: center;"><strong>Signature of Bride</strong></div>
              <div style="text-align: center;"><strong>{{kazi_name}}</strong><br><span style="font-size: 12px; color: #64748b;">Registrar & Seal</span></div>
            </div>
          </div>
        </div>
      `
    },

    // =========================================================================
    // 14. বসতঘর ক্ষতিগ্রস্ত হওয়ায় একটি বসতঘর বরাদ্দের আবেদন প্রসঙ্গে
    // =========================================================================
    {
      id: 'doc_house_allocation',
      title: 'বসতঘর ক্ষতিগ্রস্ত হওয়ায় একটি বসতঘর বরাদ্দের আবেদন প্রসঙ্গে',
      category: 'আবেদনপত্র',
      language: 'বাংলা',
      description: 'দুর্যোগ, বৃষ্টি ও জলাবদ্ধতায় বসতঘর ক্ষতিগ্রস্ত হওয়ায় সরকারি সহায়তায় নতুন বসতঘর বরাদ্দের জন্য উপজেলা নির্বাহী কর্মকর্তা বরাবর আবেদনপত্র।',
      form_fields: [
        { id: 'date', label: 'তারিখ', type: 'text', placeholder: 'উদা: ০৫/১০/২০২৩', default_value: '০৫/১০/২০২৩' },
        { id: 'recipient_designation', label: 'প্রাপকের পদবি', type: 'text', placeholder: 'উদা: উপজেলা নির্বাহী কর্মকর্তা', default_value: 'উপজেলা নির্বাহী কর্মকর্তা' },
        { id: 'office_name', label: 'অফিসের নাম', type: 'text', placeholder: 'উদা: সার্ভিসেস এন্ড সাপোর্ট সেন্টার', default_value: 'সার্ভিসেস এন্ড সাপোর্ট সেন্টার' },
        { id: 'office_address', label: 'অফিসের ঠিকানা', type: 'text', placeholder: 'উদা: মোল্লারচর, সোনারগাঁও, নারায়ণগঞ্জ', default_value: 'মোল্লারচর, সোনারগাঁও, নারায়ণগঞ্জ' },
        { id: 'applicant_name', label: 'আবেদনকারীর নাম', type: 'text', placeholder: 'উদা: আবদুল্লাহ সিদ্দিকী', default_value: 'আবদুল্লাহ সিদ্দিকী' },
        { id: 'union_name', label: 'ইউনিয়নের নাম', type: 'text', placeholder: 'উদা: কদমতলী ইউনিয়ন', default_value: 'কদমতলী ইউনিয়ন' },
        { id: 'ward_no', label: 'ওয়ার্ড নং', type: 'text', placeholder: 'উদা: ০৩', default_value: '০৩' },
        { id: 'village', label: 'গ্রাম', type: 'text', placeholder: 'উদা: মোল্লারচর', default_value: 'মোল্লারচর' },
        { id: 'incident_date', label: 'ঘটনার তারিখ', type: 'text', placeholder: 'উদা: ০২/১০/২০২৩', default_value: '০২/১০/২০২৩' },
        { id: 'cause_of_damage', label: 'ক্ষতির কারণ', type: 'text', placeholder: 'উদা: বৃষ্টি ও জলাবদ্ধতা', default_value: 'বৃষ্টি ও জলাবদ্ধতা' },
        { id: 'damage_details', label: 'ক্ষতির বিবরণ', type: 'textarea', placeholder: 'ক্ষতির বিবরণ লিখুন', default_value: 'বৃষ্টির কারণে প্রচুর ফসল নষ্ট হয়েছে এবং বাড়ির আসবাবপত্রে জল ঢুকে গেছে।' },
        { id: 'current_condition', label: 'বর্তমান অবস্থা', type: 'textarea', placeholder: 'বর্তমান অবস্থা লিখুন', default_value: 'বর্তমানে বাসস্থানটি পানির নিচে রয়েছে এবং অতি জরুরি ভিত্তিতে মেরামতের প্রয়োজন।' },
        { id: 'father_name', label: 'পিতার নাম', type: 'text', placeholder: 'উদা: মোহাম্মদ সেলিম', default_value: 'মোহাম্মদ সেলিম' },
        { id: 'post_office', label: 'ডাকঘর', type: 'text', placeholder: 'উদা: মোল্লারচর ডাকঘর', default_value: 'মোল্লারচর ডাকঘর' },
        { id: 'upazila', label: 'উপজেলা', type: 'text', placeholder: 'উদা: সোনারগাঁও উপজেলা', default_value: 'সোনারগাঁও উপজেলা' },
        { id: 'district', label: 'জেলা', type: 'text', placeholder: 'উদা: নারায়ণগঞ্জ জেলা', default_value: 'নারায়ণগঞ্জ জেলা' },
        { id: 'mobile_no', label: 'মোবাইল নং', type: 'text', placeholder: 'উদা: ০১৭১২৩৪৫৬৭৮', default_value: '০১৭১২৩৪৫৬৭৮' }
      ],
      template_html: `
        <div style="font-family: Arial, sans-serif; text-align: left; line-height: 1.6; color: #000; padding: 25mm 22mm; background: #ffffff; min-height: 297mm; box-sizing: border-box;">
          <p>তারিখঃ {{date}} ইং</p>
          <br>
          <p>বরাবর,<br>
          {{recipient_designation}}<br>
          {{office_name}}<br>
          {{office_address}}।</p>
          <br>
          <p><strong>বিষয়ঃ বসতঘর ক্ষতিগ্রস্ত হওয়ায় একটি বসতঘর বরাদ্দের আবেদন প্রসঙ্গে।</strong></p>
          <br>
          <p>মহোদয়,</p>
          <p style="text-align: justify; line-height: 2.2;">
            যথাযথ সম্মান প্রদর্শনপূর্বক বিনীত নিবেদন এই যে, আমি নিম্ন স্বাক্ষরকারী {{applicant_name}}, 
            {{union_name}} ইউনিয়নের 
            {{ward_no}} নং ওয়ার্ডের 
            {{village}} গ্রামের একজন স্থায়ী বাসিন্দা। 
            বিগত {{incident_date}} ইং তারিখে সংঘটিত 
            {{cause_of_damage}} এর কারণে আমার বসতঘর মারাত্মকভাবে ক্ষতিগ্রস্ত ও সম্পূর্ণ ধ্বংস হয়ে যায়।
          </p>
          <p style="text-align: justify; line-height: 2.2; margin-top: 15px;">
            এছাড়াও উক্ত দুর্যোগে {{damage_details}}। 
            জনাবের অবগতির জন্য জানানো প্রয়োজন যে, বসতঘরটি ক্ষতিগ্রস্ত হওয়ার পর থেকে অদ্যাবধি আমার পক্ষে নতুন ঘর নির্মাণ করা সম্ভব হয়নি। বর্তমানে আমি ও আমার পরিবার 
            {{current_condition}} অবস্থায় অত্যন্ত মানবেতর জীবনযাপন করিতেছি।
          </p>
          <p style="text-align: justify; line-height: 2.2; margin-top: 15px;">
            এমতাবস্থায়, আপনার মাধ্যমে সরকারি সহায়তায় একটি বসতঘর বরাদ্দ পেলে আমি ও আমার পরিবার বিশেষভাবে উপকৃত হবো। 
            অতএব, মহোদয়, উপরোক্ত বিষয়সমূহ সহানুভূতির সহিত বিবেচনা করে প্রয়োজনীয় ব্যবস্থা গ্রহণ করিলে আপনার নিকট চিরকৃতজ্ঞ থাকিব।
          </p>
          
          <div style="margin-top: 40px; line-height: 1.8;">
            <p>নিবেদক</p>
            <p>নামঃ {{applicant_name}}</p>
            <p>পিতাঃ {{father_name}}</p>
            <p>গ্রামঃ {{village}},</p>
            <p>ওয়ার্ড নং {{ward_no}}</p>
            <p>ডাকঘরঃ {{post_office}}</p>
            <p>উপজেলাঃ {{upazila}}</p>
            <p>জেলাঃ {{district}}</p>
            <p>মোবাইলঃ {{mobile_no}}</p>
          </div>
        </div>
      `
    },

    // =========================================================================
    // 15. উন্নয়নমূলক/জনস্বার্থ সংশ্লিষ্ট অসমাপ্ত কাজ সমাপ্ত করার জন্য আবেদন
    // =========================================================================
    {
      id: 'doc_unfinished_work',
      title: 'উন্নয়নমূলক/জনস্বার্থ সংশ্লিষ্ট অসমাপ্ত কাজ সমাপ্ত করার জন্য আবেদন',
      category: 'আবেদনপত্র',
      language: 'বাংলা',
      description: 'সরকারি উন্নয়ন প্রকল্প ও রাস্তা নির্মাণে বিবাদীর বাধার প্রেক্ষিতে তদন্তপূর্বক আইনানুগ ব্যবস্থা গ্রহণ ও অসমাপ্ত কাজ সমাপ্ত করার আবেদনপত্র।',
      form_fields: [
        { id: 'recipient_designation', label: 'প্রাপকের পদবি', type: 'text', placeholder: 'উদা: উপজেলা নির্বাহী অফিসার', default_value: 'উপজেলা নির্বাহী অফিসার' },
        { id: 'office_name', label: 'দপ্তর / অফিসের নাম', type: 'text', placeholder: 'উদা: উপজেলা প্রশাসন', default_value: 'উপজেলা প্রশাসন' },
        { id: 'office_upazila', label: 'দপ্তরের উপজেলা', type: 'text', placeholder: 'উদা: বগুড়া সদর', default_value: 'বগুড়া সদর' },
        { id: 'office_district', label: 'দপ্তরের জেলা', type: 'text', placeholder: 'উদা: বগুড়া', default_value: 'বগুড়া' },
        { id: 'badi_name', label: 'বাদীর নাম', type: 'text', placeholder: 'উদা: আবদুল্লাহ আল মামুন', default_value: 'আবদুল্লাহ আল মামুন' },
        { id: 'badi_father', label: 'বাদীর পিতার নাম', type: 'text', placeholder: 'উদা: মোহাম্মদ সেলিম', default_value: 'মোহাম্মদ সেলিম' },
        { id: 'badi_village', label: 'বাদীর গ্রাম/সাং', type: 'text', placeholder: 'উদা: পূর্বপাড়া', default_value: 'পূর্বপাড়া' },
        { id: 'badi_ward', label: 'বাদীর ওয়ার্ড নং', type: 'text', placeholder: 'উদা: ০৫', default_value: '০৫' },
        { id: 'badi_union', label: 'বাদীর ইউনিয়ন', type: 'text', placeholder: 'উদা: মাধবপুর', default_value: 'মাধবপুর' },
        { id: 'badi_upazila', label: 'বাদীর উপজেলা', type: 'text', placeholder: 'উদা: বগুড়া সদর', default_value: 'বগুড়া সদর' },
        { id: 'badi_district', label: 'বাদীর জেলা', type: 'text', placeholder: 'উদা: বগুড়া', default_value: 'বগুড়া' },
        { id: 'bibadi_name', label: 'বিবাদীর নাম', type: 'text', placeholder: 'উদা: মোঃ জাহাঙ্গীর আলম', default_value: 'মোঃ জাহাঙ্গীর আলম' },
        { id: 'bibadi_father', label: 'বিবাদীর পিতার নাম', type: 'text', placeholder: 'উদা: মোঃ আব্দুল আজিজ', default_value: 'মোঃ আব্দুল আজিজ' },
        { id: 'bibadi_village', label: 'বিবাদীর গ্রাম/সাং', type: 'text', placeholder: 'উদা: সোনাপুর', default_value: 'সোনাপুর' },
        { id: 'bibadi_ward', label: 'বিবাদীর ওয়ার্ড নং', type: 'text', placeholder: 'উদা: ০৩', default_value: '০৩' },
        { id: 'bibadi_union', label: 'বিবাদীর ইউনিয়ন', type: 'text', placeholder: 'উদা: বাগবাড়ী', default_value: 'বাগবাড়ী' },
        { id: 'bibadi_upazila', label: 'বিবাদীর উপজেলা', type: 'text', placeholder: 'উদা: বগুড়া সদর', default_value: 'বগুড়া সদর' },
        { id: 'bibadi_district', label: 'বিবাদীর জেলা', type: 'text', placeholder: 'উদা: বগুড়া', default_value: 'বগুড়া' },
        { id: 'project_name', label: 'প্রকল্পের নাম', type: 'text', placeholder: 'উদা: গ্রামীণ রাস্তা উন্নয়ন প্রকল্প', default_value: 'গ্রামীণ রাস্তা উন্নয়ন প্রকল্প' },
        { id: 'project_area', label: 'প্রকল্প এলাকা', type: 'text', placeholder: 'উদা: বগুড়া সদর', default_value: 'বগুড়া সদর' },
        { id: 'work_type', label: 'কাজের ধরন', type: 'text', placeholder: 'উদা: রাস্তা নির্মাণ', default_value: 'রাস্তা নির্মাণ' },
        { id: 'incomplete_portion', label: 'অসমাপ্ত অংশের পরিমাণ', type: 'text', placeholder: 'উদা: ২০% সম্পন্ন', default_value: '২০% সম্পন্ন' },
        { id: 'public_suffering_1', label: 'জনভোগান্তি ১ (বঞ্চিত বিষয়)', type: 'text', placeholder: 'উদা: যোগাযোগ ও চলাচল সুবিধা', default_value: 'যোগাযোগ ও চলাচল সুবিধা' },
        { id: 'public_suffering_2', label: 'জনভোগান্তি ২ (ব্যাহত বিষয়)', type: 'text', placeholder: 'উদা: স্কুল, কলেজ, হাসপাতাল ও বাজারে যাতায়াত', default_value: 'স্কুল, কলেজ, হাসপাতাল ও বাজারে যাতায়াত' },
        { id: 'supporter_1', label: 'সমর্থক ১', type: 'text', placeholder: 'উদা: রাহিম খান', default_value: 'রাহিম খান' },
        { id: 'supporter_2', label: 'সমর্থক ২', type: 'text', placeholder: 'উদা: সালেহা বেগম', default_value: 'সালেহা বেগম' },
        { id: 'supporter_3', label: 'সমর্থক ৩', type: 'text', placeholder: 'উদা: আছির উদ্দিন', default_value: 'আছির উদ্দিন' },
        { id: 'supporter_4', label: 'সমর্থক ৪', type: 'text', placeholder: 'উদা: মিনারা খাতুন', default_value: 'মিনারা খাতুন' },
        { id: 'supporter_5', label: 'সমর্থক ৫', type: 'text', placeholder: 'উদা: জাহিদ হাসান', default_value: 'জাহিদ হাসান' },
        { id: 'supporting_organization', label: 'সহায়তাকারী সংস্থা', type: 'text', placeholder: 'উদা: গ্রাম উন্নয়ন সংস্থা', default_value: 'গ্রাম উন্নয়ন সংস্থা' },
        { id: 'applicant_designation', label: 'পদবী / পরিচয়', type: 'text', placeholder: 'উদা: স্থানীয় বাসিন্দা ও আবেদনকারী', default_value: 'স্থানীয় বাসিন্দা ও আবেদনকারী' },
        { id: 'applicant_mobile', label: 'মোবাইল নম্বর', type: 'text', placeholder: 'উদা: ০১৭১২৩৪৫৬৭৮', default_value: '০১৭১২৩৪৫৬৭৮' },
        { id: 'application_date', label: 'আবেদনের তারিখ', type: 'text', placeholder: 'উদা: ০৪/০৫/২০২৩', default_value: '০৪/০৫/২০২৩' }
      ],
      template_html: `
        <div style="font-family: Arial, sans-serif; text-align: left; line-height: 1.6; color: #000; font-size: 15px; padding: 25mm 22mm; background: #ffffff; min-height: 297mm; box-sizing: border-box;">
          <p>বরাবর,<br>
          {{recipient_designation}}<br>
          {{office_name}}<br>
          {{office_upazila}}, {{office_district}}।</p>
          <br>
          <p><strong>বিষয়ঃ উন্নয়নমূলক/জনস্বার্থ সংশ্লিষ্ট অসমাপ্ত কাজ সমাপ্ত করার জন্য আবেদন।</strong></p>
          <br>
          
          <p><strong>বাদী</strong><br>
          নামঃ {{badi_name}} 
          পিতাঃ {{badi_father}} 
          সাংঃ {{badi_village}} 
          ওয়ার্ড নংঃ {{badi_ward}} 
          ইউনিয়নঃ {{badi_union}} 
          উপজেলাঃ {{badi_upazila}} 
          জেলাঃ {{badi_district}}</p>
          <br>

          <p><strong>বিবাদী</strong><br>
          নামঃ {{bibadi_name}} 
          পিতাঃ {{bibadi_father}} 
          সাংঃ {{bibadi_village}} 
          ওয়ার্ড নংঃ {{bibadi_ward}} 
          ইউনিয়নঃ {{bibadi_union}} 
          উপজেলাঃ {{bibadi_upazila}} 
          জেলাঃ {{bibadi_district}}</p>
          <br>

          <p>আবেদনের কারণ এই যে,</p>
          <p style="text-align: justify; line-height: 2.2;">
            আমরা নিম্নস্বাক্ষরকারীগণ জানাইতেছি যে, {{project_name}} প্রকল্পের আওতায় 
            {{project_area}} এলাকায় {{work_type}} কার্যক্রম চলমান রহিয়াছে। 
            উক্ত কাজের অধিকাংশ অংশ সম্পন্ন হইলেও এখনো প্রায় {{incomplete_portion}} অংশ অসমাপ্ত রহিয়াছে। 
            কিন্তু বিবাদী {{bibadi_name}} উক্ত কাজ সম্পাদনে বিভিন্ন প্রকার বাধা প্রদান করিয়া আসিতেছেন। 
            ফলে জনসাধারণ {{public_suffering_1}} হইতে বঞ্চিত হইতেছে এবং স্বাভাবিক জীবনযাত্রায় চরম ভোগান্তির সম্মুখীন হইতেছে। 
            বিশেষভাবে {{public_suffering_2}} ব্যাহত হওয়ায় এলাকার জনগণ মারাত্মক দুর্ভোগের মধ্যে রহিয়াছে।
          </p>
          <p style="text-align: justify; line-height: 2.2; margin-top: 15px;">
            উক্ত উন্নয়নমূলক কার্যক্রম বাস্তবায়নের স্বার্থে এলাকার জনগণ, যথা- 
            {{supporter_1}}, {{supporter_2}}, 
            {{supporter_3}}, {{supporter_4}}, 
            {{supporter_5}} এবং {{supporting_organization}} 
            স্বতঃস্ফূর্তভাবে সহযোগিতা প্রদান করিয়াছেন। তথাপি বিবাদীর বাধার কারণে উক্ত কাজ সম্পন্ন করা সম্ভব হইতেছে না। এমতাবস্থায়, আমরা নিরুপায় হইয়া আপনার শরণাপন্ন হইলাম।
          </p>
          <p style="text-align: justify; line-height: 2.2; margin-top: 15px;">
            অতএব, মহোদয়ের নিকট বিনীত প্রার্থনা এই যে, বিষয়টি সরেজমিনে তদন্তপূর্বক প্রয়োজনীয় আইনানুগ ব্যবস্থা গ্রহণ করিয়া উক্ত অসমাপ্ত 
            {{project_name}} দ্রুত সম্পন্ন করিবার ব্যবস্থা গ্রহণ করিয়া বাধিত করিবেন।
          </p>
          
          <div style="margin-top: 40px; line-height: 1.8;">
            <p>নিবেদক</p>
            <p>নামঃ {{badi_name}}</p>
            <p>পদবী/পরিচয়ঃ {{applicant_designation}}</p>
            <p>মোবাইলঃ {{applicant_mobile}}</p>
            <p>তারিখঃ {{application_date}} ইং</p>
          </div>
        </div>
      `
    },
    // =========================================================================
    // 5. খালি চেক মামলা (Blank Check Case / NI Act - 50 Taka Stamp Legal Size)
    // =========================================================================
    {
      id: 'doc_check_case',
      title: 'খালি চেক মামলা (Blank Check Case / NI Act)',
      category: 'মামলা',
      language: 'বাংলা',
      description: 'চেক ডিজঅনার ও আর্থিক প্রতারণার বিরুদ্ধে বিজ্ঞ আমলী আদালতে দাখিলের নিমিত্তে ৫০ টাকার নন-জুডিশিয়াল স্ট্যাম্পে প্রিন্ট উপযোগী নালিশী দরখাস্ত।',
      form_fields: [
        { id: 'court_name', label: 'বিজ্ঞ আদালত', type: 'text', placeholder: 'উদা: আমলী আদালত, কিশোরগঞ্জ', default_value: 'আমলী আদালত, কিশোরগঞ্জ' },
        { id: 'case_section', label: 'মামলার ধারা / অভিযোগ', type: 'text', placeholder: 'উদা: ৪০৬/৪২০ দঃ বিঃ', default_value: '৪০৬/৪২০ দঃ বিঃ' },
        { id: 'badi_name', label: 'বাদীর নাম', type: 'text', placeholder: 'উদা: মোহাম্মদ সহিদুল ইসলাম', default_value: 'মোহাম্মদ সহিদুল ইসলাম' },
        { id: 'badi_father', label: 'বাদীর পিতার নাম', type: 'text', placeholder: 'উদা: মোহাম্মদ আসাদ উদ্দিন', default_value: 'মোহাম্মদ আসাদ উদ্দিন' },
        { id: 'badi_vill', label: 'বাদীর সাং / গ্রাম', type: 'text', placeholder: 'উদা: কড়িয়াইল', default_value: 'কড়িয়াইল' },
        { id: 'badi_po', label: 'বাদীর ডাকঘর', type: 'text', placeholder: 'উদা: কিশোরগঞ্জ সদর', default_value: 'কিশোরগঞ্জ সদর' },
        { id: 'badi_ps', label: 'বাদীর থানা', type: 'text', placeholder: 'উদা: কিশোরগঞ্জ সদর', default_value: 'কিশোরগঞ্জ সদর' },
        { id: 'badi_dist', label: 'বাদীর জেলা', type: 'text', placeholder: 'উদা: কিশোরগঞ্জ', default_value: 'কিশোরগঞ্জ' },
        { id: 'asami_name', label: '১নং আসামীর নাম', type: 'text', placeholder: 'উদা: জাহাঙ্গীর হোসেন', default_value: 'জাহাঙ্গীর হোসেন' },
        { id: 'asami_father', label: 'আসামীর পিতার নাম', type: 'text', placeholder: 'উদা: মো. সমশের', default_value: 'মো. সমশের' },
        { id: 'asami_vill', label: 'আসামীর সাং / গ্রাম', type: 'text', placeholder: 'উদা: বাটাইলপুর', default_value: 'বাটাইলপুর' },
        { id: 'asami_po', label: 'আসামীর ডাকঘর', type: 'text', placeholder: 'উদা: কিশোরগঞ্জ সদর', default_value: 'কিশোরগঞ্জ সদর' },
        { id: 'asami_ps', label: 'আসামীর থানা', type: 'text', placeholder: 'উদা: কিশোরগঞ্জ সদর', default_value: 'কিশোরগঞ্জ সদর' },
        { id: 'asami_dist', label: 'আসামীর জেলা', type: 'text', placeholder: 'উদা: কিশোরগঞ্জ', default_value: 'কিশোরগঞ্জ' },
        { id: 'wit_1_name', label: '১ম সাক্ষীর নাম', type: 'text', placeholder: 'উদা: রহিম হোসেন', default_value: 'রহিম হোসেন' },
        { id: 'wit_1_father', label: '১ম সাক্ষীর পিতা', type: 'text', placeholder: 'উদা: মো. হাসান', default_value: 'মো. হাসান' },
        { id: 'wit_1_address', label: '১ম সাক্ষীর ঠিকানা', type: 'text', placeholder: 'উদা: কিশোরগঞ্জ সদর, কিশোরগঞ্জ', default_value: 'কিশোরগঞ্জ সদর, কিশোরগঞ্জ' },
        { id: 'wit_2_name', label: '২য় সাক্ষীর নাম', type: 'text', placeholder: 'উদা: আবুল কালাম', default_value: 'আবুল কালাম' },
        { id: 'wit_2_father', label: '২য় সাক্ষীর পিতা', type: 'text', placeholder: 'উদা: মো. সেলিম', default_value: 'মো. সেলিম' },
        { id: 'wit_2_address', label: '২য় সাক্ষীর ঠিকানা', type: 'text', placeholder: 'উদা: কিশোরগঞ্জ সদর, কিশোরগঞ্জ', default_value: 'কিশোরগঞ্জ সদর, কিশোরগঞ্জ' },
        { id: 'incident_date', label: '১ম ঘটনার তারিখ', type: 'text', placeholder: 'উদা: ২১/১০/২০২৩ খ্রিঃ', default_value: '২১/১০/২০২৩ খ্রিঃ' },
        { id: 'incident_place', label: 'ঘটনার স্থান', type: 'text', placeholder: 'উদা: কিশোরগঞ্জ সদর', default_value: 'কিশোরগঞ্জ সদর' },
        { id: 'check_given_date', label: 'চেক প্রদানের তারিখ', type: 'text', placeholder: 'উদা: ২৫/১০/২০২৩ ও ১০/১০/২০২৩ খ্রিঃ', default_value: '২৫/১০/২০২৩ ও ১০/১০/২০২৩ খ্রিঃ' },
        { id: 'check_given_place', label: 'চেক প্রদানের স্থান', type: 'text', placeholder: 'উদা: কিশোরগঞ্জ বাজার', default_value: 'কিশোরগঞ্জ বাজার' },
        { id: 'payment_promise_date', label: 'টাকা পরিশোধের প্রতিশ্রুতি তারিখ ও স্থান', type: 'text', placeholder: 'উদা: ১৫/১০/২০২৩ খ্রিঃ, বিকাল ৩:০০ ঘটিকায়, কিশোরগঞ্জ', default_value: '১৫/১০/২০২৩ খ্রিঃ, বিকাল ৩:০০ ঘটিকায়, কিশোরগঞ্জ' },
        { id: 'claim_amount', label: 'দাবীকৃত পাওনা টাকা', type: 'text', placeholder: 'উদা: ৫০০০০০ (পাঁচ লক্ষ) টাকা', default_value: '৫০০০০০ (পাঁচ লক্ষ) টাকা' }
      ],
      template_html: `
        <div style="display: flex; flex-direction: column; gap: 40px;">
          <!-- PAGE 1 (Legal Size - Stamp Clearance) -->
          <div style="background: linear-gradient(180deg, rgba(16, 185, 129, 0.12) 0in, rgba(240, 253, 244, 0.5) 3.5in, #ffffff 4.5in); border: 1.5px solid #cbd5e1; border-radius: 4px; padding-top: 4.5in; padding-bottom: 2in; padding-left: 0.9in; padding-right: 0.9in; min-height: 14in; box-sizing: border-box; position: relative;">
            <div style="position: absolute; top: 1.2in; left: 5%; width: 90%; height: 2.2in; border: 2px dashed rgba(5, 150, 105, 0.35); border-radius: 8px; display: flex; align-items: center; justify-content: center; text-align: center; color: #047857; font-weight: 700; background: rgba(255,255,255,0.7); font-size: 13px;">
              গণপ্রজাতন্ত্রী বাংলাদেশ সরকার — ৫০ টাকা নন-জুডিশিয়াল স্ট্যাম্পের জন্য সংরক্ষিত ফাঁকা স্থান (১ম পাতা)
            </div>
            
            <h3 style="text-align: center; font-weight: bold; margin-bottom: 20px;">বিজ্ঞ {{court_name}}</h3>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 14px;" border="1">
              <tr>
                <th style="padding: 5px; text-align: left; width: 33%;">বাদী</th>
                <th style="padding: 5px; text-align: left; width: 33%;">আসামী</th>
                <th style="padding: 5px; text-align: left; width: 33%;">সাক্ষী</th>
              </tr>
              <tr>
                <td style="padding: 5px; vertical-align: top;">
                  নামঃ {{badi_name}}<br>
                  পিতাঃ {{badi_father}}<br>
                  সাংঃ {{badi_vill}}<br>
                  ডাকঃ {{badi_po}}<br>
                  জেলাঃ {{badi_dist}}
                </td>
                <td style="padding: 5px; vertical-align: top;">
                  ১। নামঃ {{asami_name}}<br>
                  পিতাঃ {{asami_father}}<br>
                  সাংঃ {{asami_vill}}<br>
                  ডাকঃ {{asami_po}}<br>
                  জেলাঃ {{asami_dist}}
                </td>
                <td style="padding: 5px; vertical-align: top;">
                  ১। নামঃ {{wit_1_name}}<br>
                  পিতাঃ {{wit_1_father}}<br>
                  সাংঃ {{wit_1_address}}<br><br>
                  ২। নামঃ {{wit_2_name}}<br>
                  পিতাঃ {{wit_2_father}}<br>
                  সাংঃ {{wit_2_address}}
                </td>
              </tr>
            </table>

            <div style="font-size: 14px; line-height: 2;">
              <strong>১ম ঘটনার বিবরণ</strong><br>
              তারিখঃ {{incident_date}}<br>
              স্থানঃ {{incident_place}}<br>
              চেক প্রদানঃ {{check_given_date}}<br>
              চেক প্রদানের স্থানঃ {{check_given_place}}<br>
              দাবীকৃত টাকা পরিশোধের তারিখ ও স্থানঃ {{payment_promise_date}}<br>
              পাওনা টাকাঃ {{claim_amount}}
            </div>
          </div>

          <!-- PAGE 2 (Legal Size - Stamp Clearance) -->
          <div style="background: linear-gradient(180deg, rgba(16, 185, 129, 0.12) 0in, rgba(240, 253, 244, 0.5) 3.5in, #ffffff 4.5in); border: 1.5px solid #cbd5e1; border-radius: 4px; padding-top: 4.5in; padding-bottom: 2in; padding-left: 0.9in; padding-right: 0.9in; min-height: 14in; box-sizing: border-box; position: relative;">
            <div style="position: absolute; top: 1.2in; left: 5%; width: 90%; height: 2.2in; border: 2px dashed rgba(5, 150, 105, 0.35); border-radius: 8px; display: flex; align-items: center; justify-content: center; text-align: center; color: #047857; font-weight: 700; background: rgba(255,255,255,0.7); font-size: 13px;">
              গণপ্রজাতন্ত্রী বাংলাদেশ সরকার — ৫০ টাকা নন-জুডিশিয়াল স্ট্যাম্পের জন্য সংরক্ষিত ফাঁকা স্থান (২য় পাতা)
            </div>

            <p style="text-align: center;"><strong>পাতা নং-২</strong></p>
            <p><strong>অভিযোগঃ {{case_section}}</strong></p>
            
            <p style="font-weight: bold; margin-top: 20px;">বিনীত বাদীর আরজ এই যে,</p>
            <p style="text-align: justify; line-height: 2.2;">
              বাদী ও আসামীর মধ্যে পূর্ব হইতে আর্থিক লেনদেন ও পরিচিতি রহিয়াছে। উক্ত লেনদেনের সূত্রে আসামীর নিকট বাদীর 
              {{claim_amount}} পাওনা হয়। পাওনা টাকা পরিশোধের আশ্বাস প্রদান করিয়া আসামী বাদীর অনুকূলে একটি চেক প্রদান করেন। 
              পরবর্তীতে বাদী উক্ত চেকটি ক্যাশ করার নিমিত্তে ব্যাংকে উপস্থাপন করিলে হিসাব বন্ধ থাকায়/অপর্যাপ্ত তহবিল থাকায় তা ডিজঅনার হয়। 
              বিষয়টি আসামীকে অবহিত করিলে আসামী বিভিন্ন সময় বিভিন্ন অজুহাত দেখাইয়া সময়ক্ষেপণ করিতে থাকেন। পরবর্তীতে আসামী উক্ত টাকা প্রদান করিতে অস্বীকৃতি জ্ঞাপন করেন। 
              আসামী প্রতারণার উদ্দেশ্যে চেক প্রদান করিয়া বাদীর আর্থিক ক্ষতিসাধন করিয়াছেন এবং দণ্ডবিধির {{case_section}} ধারার শাস্তিযোগ্য অপরাধ করিয়াছেন।
            </p>

            <p style="text-align: justify; line-height: 2.2; margin-top: 15px;">
              এমতাবস্থায়, প্রার্থনা এই যে, বিজ্ঞ আদালত বিষয়টি আমলে গ্রহণ করিয়া আসামীর বিরুদ্ধে আইনানুগ বিচার প্রক্রিয়া শুরু করিয়া সুবিচার করিবেন।
            </p>

            <div style="margin-top: 40px; display: flex; justify-content: space-between;">
              <div>
                <p>তারিখঃ {{incident_date}}</p>
              </div>
              <div style="text-align: center;">
                <p>বাদী</p>
                <br>
                <p>.......................................</p>
                <p>{{badi_name}}</p>
              </div>
            </div>
          </div>
        </div>
      `
    },
    // =========================================================================
    // 6. ফর্ম ফিলাপের অনুমতির জন্য আবেদন (Application for Form Fillup Permission)
    // =========================================================================
    {
      id: 'doc_form_fillup',
      title: 'ফর্ম ফিলাপের অনুমতির জন্য আবেদন',
      category: 'আবেদনপত্র',
      language: 'বাংলা',
      description: 'টেস্ট/নির্বাচনী পরীক্ষায় অকৃতকার্য হওয়া শিক্ষার্থীদের পরীক্ষায় অংশগ্রহণের নিমিত্তে অধ্যক্ষ বরাবর ফর্ম ফিলাপের আনুষ্ঠানিক আবেদনপত্র।',
      form_fields: [
        { id: 'recipient_designation', label: 'প্রাপকের পদবী', type: 'text', placeholder: 'উদা: অধ্যক্ষ', default_value: 'অধ্যক্ষ' },
        { id: 'institution_name', label: 'শিক্ষা প্রতিষ্ঠানের নাম', type: 'text', placeholder: 'উদা: সরকারি আজিজুল হক কলেজ', default_value: 'সরকারি আজিজুল হক কলেজ' },
        { id: 'institution_upazila', label: 'উপজেলা / থানা', type: 'text', placeholder: 'উদা: বগুড়া সদর', default_value: 'বগুড়া সদর' },
        { id: 'institution_district', label: 'জেলা', type: 'text', placeholder: 'উদা: বগুড়া', default_value: 'বগুড়া' },
        { id: 'exam_name', label: 'পরীক্ষার নাম', type: 'text', placeholder: 'উদা: এসএসসি', default_value: 'এসএসসি' },
        { id: 'applicant_name', label: 'শিক্ষার্থীর নাম', type: 'text', placeholder: 'উদা: মোহাম্মদ আরিফ', default_value: 'মোহাম্মদ আরিফ' },
        { id: 'roll_number', label: 'রোল নং', type: 'text', placeholder: 'উদা: ১২৩৪৫', default_value: '১২৩৪৫' },
        { id: 'department_name', label: 'বিভাগ / শাখা', type: 'text', placeholder: 'উদা: বিজ্ঞান', default_value: 'বিজ্ঞান' },
        { id: 'exam_year', label: 'পরীক্ষার সাল', type: 'text', placeholder: 'উদা: ২০২৩', default_value: '২০২৩' },
        { id: 'failed_subjects_count', label: 'অকৃতকার্য বিষয়ের সংখ্যা', type: 'text', placeholder: 'উদা: ২', default_value: '২' },
        { id: 'application_date', label: 'আবেদনের তারিখ', type: 'text', placeholder: 'উদা: ১০/১০/২০২৩', default_value: '১০/১০/২০২৩' },
        { id: 'applicant_mobile', label: 'শিক্ষার্থীর মোবাইল নং', type: 'text', placeholder: 'উদা: ০১৭১২৩৪৫৬৭৮', default_value: '০১৭১২৩৪৫৬৭৮' },
        { id: 'guardian_name', label: 'অভিভাবকের নাম', type: 'text', placeholder: 'উদা: মোহাম্মদ সালাম', default_value: 'মোহাম্মদ সালাম' },
        { id: 'guardian_relation', label: 'শিক্ষার্থীর সাথে সম্পর্ক', type: 'text', placeholder: 'উদা: পিতা', default_value: 'পিতা' },
        { id: 'guardian_mobile', label: 'অভিভাবকের মোবাইল নং', type: 'text', placeholder: 'উদা: ০১৮১২৩৪৫৬৭৮', default_value: '০১৮১২৩৪৫৬৭৮' }
      ],
      template_html: `
        <div style="font-family: Arial, sans-serif; text-align: left; line-height: 1.6; color: #000; font-size: 15px;">
          <p>বরাবর,<br>
          {{recipient_designation}}<br>
          {{institution_name}}<br>
          {{institution_upazila}}, {{institution_district}}।</p>
          <br>
          <p>বিষয়ঃ {{exam_name}} পরীক্ষার ফর্ম ফিলাপের অনুমতির জন্য আবেদন।</p>
          <br>
          
          <p>জনাব,</p>
          <p style="text-align: justify; line-height: 2.2;">
            যথাযথ সম্মান প্রদর্শনপূর্বক বিনীত নিবেদন এই যে, আমি নিম্নস্বাক্ষরকারী {{applicant_name}}, 
            রোল নং- {{roll_number}}, 
            বিভাগ- {{department_name}}, 
            {{exam_year}} সালের 
            {{exam_name}} পরীক্ষার্থী। নির্বাচনী/টেস্ট পরীক্ষায় আমি 
            {{failed_subjects_count}} বিষয়ে অকৃতকার্য হইয়াছি। আমি অঙ্গীকার করিতেছি যে, এখন হইতে নিয়মিত ও মনোযোগ সহকারে অধ্যয়ন করিব এবং আসন্ন 
            {{exam_name}} পরীক্ষায় সকল বিষয়ে কৃতকার্য হওয়ার সর্বোচ্চ চেষ্টা করিব, ইনশাআল্লাহ।
          </p>
          
          <p style="text-align: justify; line-height: 2.2; margin-top: 15px;">
            অতএব, মহোদয়ের নিকট বিনীত প্রার্থনা, উপরোক্ত বিষয়টি সদয় বিবেচনা করিয়া আমাকে {{exam_name}} পরীক্ষার ফর্ম ফিলাপের অনুমতি প্রদান করিয়া বাধিত করিবেন।
          </p>
          
          <div style="margin-top: 30px;">
            <p>তারিখঃ {{application_date}} ইং</p>
          </div>
          
          <div style="margin-top: 40px; display: flex; flex-direction: column; gap: 30px;">
            <div>
              <p style="font-weight: bold; margin-bottom: 5px;">আবেদনকারীর স্বাক্ষর</p>
              <p>নামঃ {{applicant_name}}</p>
              <p>পরীক্ষার নামঃ {{exam_name}}</p>
              <p>রোল নংঃ {{roll_number}}</p>
              <p>মোবাইল নংঃ {{applicant_mobile}}</p>
            </div>
            
            <div>
              <p style="font-weight: bold; margin-bottom: 5px;">অভিভাবকের স্বাক্ষর</p>
              <p>নামঃ {{guardian_name}}</p>
              <p>শিক্ষার্থীর সাথে সম্পর্কঃ {{guardian_relation}}</p>
              <p>মোবাইল নংঃ {{guardian_mobile}}</p>
            </div>
          </div>
        </div>
      `
    },
    // =========================================================================
    // 7. আমমোক্তার দলিল (Power of Attorney - 50 Taka Stamp Legal Size)
    // =========================================================================
    {
      id: 'doc_ammoktar_dolil',
      title: 'আমমোক্তার দলিল (Power of Attorney)',
      category: 'দলিল',
      language: 'বাংলা',
      description: 'স্থাবর সম্পত্তি দেখাশোনা, তদারকি, খাজনা প্রদান ও প্রয়োজনীয় মামলা-মোকদ্দমা পরিচালনার জন্য ৫০ টাকার নন-জুডিশিয়াল স্ট্যাম্পে আমমোক্তার নিয়োগ দলিল।',
      form_fields: [
        { id: 'party1_name', label: 'দাতার নাম', type: 'text', placeholder: 'উদা: মোহাম্মদ আলী', default_value: 'মোহাম্মদ আলী' },
        { id: 'party1_father', label: 'দাতার পিতার নাম', type: 'text', placeholder: 'উদা: রহমান হোসেন', default_value: 'রহমান হোসেন' },
        { id: 'party1_address', label: 'দাতার ঠিকানা', type: 'text', placeholder: 'উদা: গ্রামঃ রহমতপুর, পোস্টঃ রহমতপুর, থানাঃ কোতোয়ালী, জেলাঃ ঢাকা', default_value: 'গ্রামঃ রহমতপুর, পোস্টঃ রহমতপুর, থানাঃ কোতোয়ালী, জেলাঃ ঢাকা' },
        { id: 'party1_nationality', label: 'দাতার জাতীয়তা', type: 'text', placeholder: 'উদা: বাংলাদেশী', default_value: 'বাংলাদেশী' },
        { id: 'party1_religion', label: 'দাতার ধর্ম', type: 'text', placeholder: 'উদা: ইসলাম', default_value: 'ইসলাম' },
        { id: 'party1_profession', label: 'দাতার পেশা', type: 'text', placeholder: 'উদা: ব্যবসায়ী', default_value: 'ব্যবসায়ী' },
        { id: 'party2_name', label: 'গ্রহীতার নাম', type: 'text', placeholder: 'উদা: মাহমুদা বেগম', default_value: 'মাহমুদা বেগম' },
        { id: 'party2_father', label: 'গ্রহীতার পিতার নাম', type: 'text', placeholder: 'উদা: আব্দুল আলীম', default_value: 'আব্দুল আলীম' },
        { id: 'party2_address', label: 'গ্রহীতার ঠিকানা', type: 'text', placeholder: 'উদা: গ্রামঃ রহমতপুর, পোস্টঃ রহমতপুর, থানাঃ কোতোয়ালী, জেলাঃ ঢাকা', default_value: 'গ্রামঃ রহমতপুর, পোস্টঃ রহমতপুর, থানাঃ কোতোয়ালী, জেলাঃ ঢাকা' },
        { id: 'party2_nationality', label: 'গ্রহীতার জাতীয়তা', type: 'text', placeholder: 'উদা: বাংলাদেশী', default_value: 'বাংলাদেশী' },
        { id: 'party2_religion', label: 'গ্রহীতার ধর্ম', type: 'text', placeholder: 'উদা: ইসলাম', default_value: 'ইসলাম' },
        { id: 'party2_profession', label: 'গ্রহীতার পেশা', type: 'text', placeholder: 'উদা: গৃহিণী', default_value: 'গৃহিণী' },
        { id: 'property_details', label: 'সম্পত্তির বিবরণ', type: 'text', placeholder: 'উদা: ঢাকা জেলার কোতোয়ালী থানার অন্তর্গত ১০ কাঠা জমি', default_value: 'ঢাকা জেলার কোতোয়ালী থানার অন্তর্গত ১০ কাঠা জমি' },
        { id: 'reason_for_poa', label: 'আমমোক্তার নিযুক্তির কারণ', type: 'text', placeholder: 'উদা: অসুস্থ থাকার কারণে', default_value: 'অসুস্থ থাকার কারণে' },
        { id: 'doc_date', label: 'দলিল সম্পাদনের তারিখ', type: 'text', placeholder: 'উদা: ০৫/০৫/২০২৩ ইং', default_value: '০৫/০৫/২০২৩ ইং' }
      ],
      template_html: `
        <div style="display: flex; flex-direction: column; gap: 40px;">
          <!-- PAGE 1 (Legal Size - Stamp Clearance) -->
          <div style="background: linear-gradient(180deg, rgba(16, 185, 129, 0.12) 0in, rgba(240, 253, 244, 0.5) 3.5in, #ffffff 4.5in); border: 1.5px solid #cbd5e1; border-radius: 4px; padding-top: 4.5in; padding-bottom: 2in; padding-left: 0.9in; padding-right: 0.9in; min-height: 14in; box-sizing: border-box; position: relative;">
            <div style="position: absolute; top: 1.2in; left: 5%; width: 90%; height: 2.2in; border: 2px dashed rgba(5, 150, 105, 0.35); border-radius: 8px; display: flex; align-items: center; justify-content: center; text-align: center; color: #047857; font-weight: 700; background: rgba(255,255,255,0.7); font-size: 13px;">
              গণপ্রজাতন্ত্রী বাংলাদেশ সরকার — ৫০ টাকা নন-জুডিশিয়াল স্ট্যাম্পের জন্য সংরক্ষিত ফাঁকা স্থান (১ম পাতা)
            </div>
            
            <h3 style="text-align: center; font-weight: bold; margin-bottom: 30px;">আমমোক্তার দলিল</h3>
            
            <div style="font-size: 15px; line-height: 2;">
              <strong>প্রথম পক্ষ/আমমোক্তার দাতাঃ</strong><br>
              নামঃ {{party1_name}}, 
              পিতাঃ {{party1_father}}, 
              ঠিকানাঃ {{party1_address}}, 
              জাতীয়তাঃ {{party1_nationality}}, 
              ধর্মঃ {{party1_religion}}, 
              পেশা: {{party1_profession}}।
              <br><br>
              
              <strong>দ্বিতীয় পক্ষ/আমমোক্তার গ্রহীতাঃ</strong><br>
              নামঃ {{party2_name}}, 
              পিতাঃ {{party2_father}}, 
              ঠিকানাঃ {{party2_address}}, 
              জাতীয়তাঃ {{party2_nationality}}, 
              ধর্মঃ {{party2_religion}}, 
              পেশা: {{party2_profession}}।
              <br><br>

              <p style="text-align: justify; line-height: 2.2;">
                পরম করুণাময় মহান আল্লাহ তায়ালার নাম স্মরণ করিয়া {{property_details}} স্থিত আমার মালিকানাধীন সম্পত্তি দেখাশোনা, সংরক্ষণ, তদারকি, ব্যবস্থাপনা এবং প্রয়োজনীয় মামলা-মোকদ্দমা পরিচালনার উদ্দেশ্যে আমি প্রথম পক্ষ, দ্বিতীয় পক্ষকে আমার বৈধ আমমোক্তার নিযুক্ত করিলাম। বর্তমানে আমি {{reason_for_poa}} উক্ত সম্পত্তির যাবতীয় কার্যক্রম সরাসরি পরিচালনা করা আমার পক্ষে সম্ভব নহে। তাই অত্র দলিলভুক্ত সম্পত্তির ব্যবস্থাপনা, সংরক্ষণ, রক্ষণাবেক্ষণ, প্রশাসনিক কার্যক্রম, আদালত সংক্রান্ত কার্যক্রম এবং আইনানুগ অন্যান্য প্রয়োজনীয় কাজ সম্পাদনের জন্য দ্বিতীয় পক্ষকে নিম্নবর্ণিত ক্ষমতা অর্পণ করিলাম:
              </p>
              <br>
              <p style="text-align: justify; line-height: 2.2;">
                ১। আমমোক্তার গ্রহীতা আমার পক্ষে সম্পত্তি সংক্রান্ত সকল বৈধ কার্যক্রম পরিচালনা, প্রয়োজনীয় আবেদন, দরখাস্ত, জবাব, কাগজপত্র দাখিল ও গ্রহণ করিতে পারিবেন।
              </p>
            </div>
          </div>

          <!-- PAGE 2 (Legal Size - Stamp Clearance) -->
          <div style="background: linear-gradient(180deg, rgba(16, 185, 129, 0.12) 0in, rgba(240, 253, 244, 0.5) 3.5in, #ffffff 4.5in); border: 1.5px solid #cbd5e1; border-radius: 4px; padding-top: 4.5in; padding-bottom: 2in; padding-left: 0.9in; padding-right: 0.9in; min-height: 14in; box-sizing: border-box; position: relative;">
            <div style="position: absolute; top: 1.2in; left: 5%; width: 90%; height: 2.2in; border: 2px dashed rgba(5, 150, 105, 0.35); border-radius: 8px; display: flex; align-items: center; justify-content: center; text-align: center; color: #047857; font-weight: 700; background: rgba(255,255,255,0.7); font-size: 13px;">
              গণপ্রজাতন্ত্রী বাংলাদেশ সরকার — ৫০ টাকা নন-জুডিশিয়াল স্ট্যাম্পের জন্য সংরক্ষিত ফাঁকা স্থান (২য় পাতা)
            </div>

            <p style="text-align: center; margin-bottom: 20px;"><strong>পাতা নং-২</strong></p>
            
            <div style="font-size: 15px; text-align: justify; line-height: 2.2;">
              <p>২। তিনি আমার পক্ষে আদালত, থানা, ভূমি অফিস, সাব-রেজিস্ট্রি অফিস, ইউনিয়ন পরিষদ, পৌরসভা, সিটি কর্পোরেশন, সরকারি, আধা-সরকারি ও বেসরকারি সকল প্রতিষ্ঠানে উপস্থিত হইয়া প্রয়োজনীয় কার্য সম্পাদন করিতে পারিবেন।</p>
              <p>৩। তিনি আমার পক্ষে ক্রয়-বিক্রয়, লিজ-ভাড়া, চুক্তি, বায়না ও অন্যান্য হস্তান্তর সংক্রান্ত দলিলাদি, বায়না নামা, আপোষ-মীমাংসা, বিক্রি রসিদ, দখল গ্রহণ এবং আইনানুগ অন্যান্য কার্যক্রম পরিচালনা করিতে পারিবেন।</p>
              <p>৪। তিনি খতিয়ান, দাগ, রেকর্ড, নামজারি, খারিজ, রেকর্ড সংশোধন, জরিপ সংশোধন ও সম্পত্তি সংক্রান্ত অন্যান্য প্রশাসনিক কার্যক্রম সম্পাদন করিতে পারিবেন।</p>
              <p>৫। অত্র দলিলভুক্ত সম্পত্তির বিষয়ে আমি আইনত বাধ্য রহিব, তদ্ব্যতীত সকল বৈধ কার্য এই আমমোক্তার দলিলের মাধ্যমে দ্বিতীয় পক্ষ সম্পাদন করিতে পারিবেন।</p>
              <p>৬। দ্বিতীয় পক্ষ কর্তৃক সম্পাদিত সকল বৈধ কার্য আমার নিজ কার্য বলিয়া গণ্য হইবে।</p>
            </div>

            <div style="margin-top: 60px;">
              <p>স্বাক্ষর: .......................................</p>
              <p>তারিখঃ {{doc_date}}</p>
            </div>
          </div>
        </div>
      `
    }
  ];

  /**
   * Helper: Get Template by ID
   */
  function getTemplateById(id) {
    if (!id) return DOCUMENT_TEMPLATES[0];
    const found = DOCUMENT_TEMPLATES.find(t => t.id === id);
    return found || DOCUMENT_TEMPLATES[0];
  }

  /**
   * Helper: Render Preview HTML
   * Replaces every {{field_id}} with a highlighted green span indicating variable field
   */
  function renderPreviewHTML(template) {
    if (!template || !template.template_html) return '';
    let html = template.template_html;
    if (template.form_fields && Array.isArray(template.form_fields)) {
      template.form_fields.forEach(f => {
        const regex = new RegExp(`\\{\\{${f.id}\\}\\}`, 'g');
        const highlighted = `<span class="highlight-field" style="background-color: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; font-weight: 600; display: inline-block; border: 1px dashed rgba(22, 101, 52, 0.35);">[${f.label}]</span>`;
        html = html.replace(regex, highlighted);
      });
    }
    return html;
  }

  /**
   * Helper: Render Creator HTML
   * Replaces every {{field_id}} with a data-bound span with .doc-bound-field
   */
  function renderCreatorHTML(template, initialValues = {}) {
    if (!template || !template.template_html) return '';
    let html = template.template_html;
    if (template.form_fields && Array.isArray(template.form_fields)) {
      template.form_fields.forEach(f => {
        const regex = new RegExp(`\\{\\{${f.id}\\}\\}`, 'g');
        const val = initialValues[f.id] !== undefined ? initialValues[f.id] : (f.default_value || '');
        let span = '';
        if (val && val.trim() !== '') {
          span = `<span class="doc-bound-field field-filled" data-placeholder="${f.id}" style="color: #0f172a; font-weight: 700; border-bottom: 1.5px solid #0f766e; padding: 0 4px; background: transparent;">${val}</span>`;
        } else {
          span = `<span class="doc-bound-field highlight-field" data-placeholder="${f.id}" style="background-color: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; font-weight: 600; display: inline-block; border: 1px dashed rgba(22, 101, 52, 0.35);">[${f.label}]</span>`;
        }
        html = html.replace(regex, span);
      });
    }
    return html;
  }

  // Export globally
  window.DOCUMENT_TEMPLATES = DOCUMENT_TEMPLATES;
  window.getTemplateById = getTemplateById;
  window.renderPreviewHTML = renderPreviewHTML;
  window.renderCreatorHTML = renderCreatorHTML;

})(window);
